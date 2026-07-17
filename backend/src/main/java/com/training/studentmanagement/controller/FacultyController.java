package com.training.studentmanagement.controller;

import com.training.studentmanagement.dto.FacultyDTO;
import com.training.studentmanagement.service.FacultyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins = "*")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping
    public ResponseEntity<FacultyDTO> addFaculty(@Valid @RequestBody FacultyDTO facultyDTO) {

        FacultyDTO savedFaculty = facultyService.addFaculty(facultyDTO);

        return new ResponseEntity<>(savedFaculty, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FacultyDTO>> getAllFaculty() {

        return ResponseEntity.ok(facultyService.getAllFaculty());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyDTO> getFacultyById(@PathVariable Long id) {

        return ResponseEntity.ok(facultyService.getFacultyById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultyDTO> updateFaculty(
            @PathVariable Long id,
            @Valid @RequestBody FacultyDTO facultyDTO) {

        return ResponseEntity.ok(facultyService.updateFaculty(id, facultyDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {

        facultyService.deleteFaculty(id);

        return ResponseEntity.ok("Faculty deleted successfully");
    }
}