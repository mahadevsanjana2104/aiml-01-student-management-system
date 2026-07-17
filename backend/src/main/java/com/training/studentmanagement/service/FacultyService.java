package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.FacultyDTO;

import java.util.List;

public interface FacultyService {

    FacultyDTO addFaculty(FacultyDTO facultyDTO);

    List<FacultyDTO> getAllFaculty();

    FacultyDTO getFacultyById(Long id);

    FacultyDTO updateFaculty(Long id, FacultyDTO facultyDTO);

    void deleteFaculty(Long id);
}