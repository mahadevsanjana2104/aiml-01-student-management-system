
package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.MarksDTO;
import com.training.studentmanagement.entity.Course;
import com.training.studentmanagement.entity.Marks;
import com.training.studentmanagement.entity.Student;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.repository.CourseRepository;
import com.training.studentmanagement.repository.MarksRepository;
import com.training.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarksServiceImpl implements MarksService {

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public MarksDTO addMarks(MarksDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new StudentNotFoundException("Course not found"));

        if (!student.getCourses().contains(course)) {
            throw new RuntimeException("Student is not enrolled in this course.");
        }

        int total = dto.getInternalMarks() + dto.getExternalMarks();

        String grade = calculateGrade(total);

        Marks marks = Marks.builder()
                .student(student)
                .course(course)
                .internalMarks(dto.getInternalMarks())
                .externalMarks(dto.getExternalMarks())
                .totalMarks(total)
                .grade(grade)
                .build();

        Marks saved = marksRepository.save(marks);

        return mapToDTO(saved);
    }

    @Override
    public List<MarksDTO> getAllMarks() {

        return marksRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public MarksDTO getMarksById(Long id) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Marks not found"));

        return mapToDTO(marks);
    }

    @Override
    public MarksDTO updateMarks(Long id, MarksDTO dto) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Marks not found"));

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new StudentNotFoundException("Course not found"));

        if (!student.getCourses().contains(course)) {
            throw new RuntimeException("Student is not enrolled in this course.");
        }

        int total = dto.getInternalMarks() + dto.getExternalMarks();

        marks.setStudent(student);
        marks.setCourse(course);
        marks.setInternalMarks(dto.getInternalMarks());
        marks.setExternalMarks(dto.getExternalMarks());
        marks.setTotalMarks(total);
        marks.setGrade(calculateGrade(total));

        Marks updated = marksRepository.save(marks);

        return mapToDTO(updated);
    }

    @Override
    public void deleteMarks(Long id) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Marks not found"));

        marksRepository.delete(marks);
    }

    private String calculateGrade(int total){

        if(total >= 90) return "A+";
        if(total >= 80) return "A";
        if(total >= 70) return "B";
        if(total >= 60) return "C";
        if(total >= 50) return "D";

        return "F";

    }

    private MarksDTO mapToDTO(Marks marks){

        return MarksDTO.builder()
                .id(marks.getId())
                .studentId(marks.getStudent().getId())
                .courseId(marks.getCourse().getId())
                .internalMarks(marks.getInternalMarks())
                .externalMarks(marks.getExternalMarks())
                .totalMarks(marks.getTotalMarks())
                .grade(marks.getGrade())
                .build();

    }

}