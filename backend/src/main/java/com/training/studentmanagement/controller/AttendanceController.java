package com.training.studentmanagement.controller;

import com.training.studentmanagement.dto.AttendanceDTO;
import com.training.studentmanagement.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<AttendanceDTO> markAttendance(
            @Valid @RequestBody AttendanceDTO dto) {

        return new ResponseEntity<>(
                attendanceService.markAttendance(dto),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AttendanceDTO>> getAllAttendance() {
        return ResponseEntity.ok(attendanceService.getAllAttendance());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDTO> getAttendanceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(attendanceService.getAttendanceById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDTO> updateAttendance(
            @PathVariable Long id,
            @Valid @RequestBody AttendanceDTO dto) {

        return ResponseEntity.ok(
                attendanceService.updateAttendance(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return ResponseEntity.ok("Attendance deleted successfully");
    }
}