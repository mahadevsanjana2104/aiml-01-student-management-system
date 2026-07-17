package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.MarksDTO;

import java.util.List;

public interface MarksService {

    MarksDTO addMarks(MarksDTO dto);

    List<MarksDTO> getAllMarks();

    MarksDTO getMarksById(Long id);

    MarksDTO updateMarks(Long id, MarksDTO dto);

    void deleteMarks(Long id);

}