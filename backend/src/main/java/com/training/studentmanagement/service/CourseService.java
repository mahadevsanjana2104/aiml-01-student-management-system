package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.CourseDTO;

import java.util.List;

public interface CourseService {

    CourseDTO addCourse(CourseDTO dto);

    List<CourseDTO> getAllCourses();

    CourseDTO getCourseById(Long id);

    CourseDTO updateCourse(Long id, CourseDTO dto);

    void deleteCourse(Long id);

}