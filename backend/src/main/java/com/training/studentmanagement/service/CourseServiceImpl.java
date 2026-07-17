package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.CourseDTO;
import com.training.studentmanagement.entity.Course;
import com.training.studentmanagement.entity.Faculty;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.repository.CourseRepository;
import com.training.studentmanagement.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public CourseDTO addCourse(CourseDTO dto) {

        Faculty faculty = facultyRepository.findById(dto.getFacultyId())
                .orElseThrow(() ->
                        new StudentNotFoundException("Faculty not found"));

        Course course = Course.builder()
                .courseName(dto.getCourseName())
                .courseCode(dto.getCourseCode())
                .credits(dto.getCredits())
                .faculty(faculty)
                .build();

        Course savedCourse = courseRepository.save(course);

        return mapToDTO(savedCourse);
    }

    @Override
    public List<CourseDTO> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public CourseDTO getCourseById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Course not found"));

        return mapToDTO(course);
    }

    @Override
    public CourseDTO updateCourse(Long id, CourseDTO dto) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Course not found"));

        Faculty faculty = facultyRepository.findById(dto.getFacultyId())
                .orElseThrow(() ->
                        new StudentNotFoundException("Faculty not found"));

        course.setCourseName(dto.getCourseName());
        course.setCourseCode(dto.getCourseCode());
        course.setCredits(dto.getCredits());
        course.setFaculty(faculty);

        Course updatedCourse = courseRepository.save(course);

        return mapToDTO(updatedCourse);
    }

    @Override
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Course not found"));

        courseRepository.delete(course);
    }

    private CourseDTO mapToDTO(Course course) {

        return CourseDTO.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .courseCode(course.getCourseCode())
                .credits(course.getCredits())
                .facultyId(course.getFaculty().getId())
                .build();
    }
}