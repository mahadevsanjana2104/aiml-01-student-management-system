package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.StudentDTO;

import java.util.List;

public interface StudentService {

    StudentDTO addStudent(StudentDTO studentDTO);

    List<StudentDTO> getAllStudents();

    StudentDTO getStudentById(Long id);

    StudentDTO updateStudent(Long id, StudentDTO studentDTO);
    StudentDTO enrollCourse(Long studentId, Long courseId);

    void deleteStudent(Long id);
}