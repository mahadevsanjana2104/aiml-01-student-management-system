package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.AttendanceDTO;

import java.util.List;

public interface AttendanceService {

    AttendanceDTO markAttendance(AttendanceDTO dto);

    List<AttendanceDTO> getAllAttendance();

    AttendanceDTO getAttendanceById(Long id);

    AttendanceDTO updateAttendance(Long id, AttendanceDTO dto);

    void deleteAttendance(Long id);

}