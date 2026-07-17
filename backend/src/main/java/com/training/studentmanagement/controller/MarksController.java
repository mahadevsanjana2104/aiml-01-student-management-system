package com.training.studentmanagement.controller;

import com.training.studentmanagement.dto.MarksDTO;
import com.training.studentmanagement.service.MarksService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "*")
public class MarksController {

    @Autowired
    private MarksService marksService;

    @PostMapping
    public ResponseEntity<MarksDTO> addMarks(@Valid @RequestBody MarksDTO dto){

        return new ResponseEntity<>(marksService.addMarks(dto), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<MarksDTO>> getAllMarks(){

        return ResponseEntity.ok(marksService.getAllMarks());

    }

    @GetMapping("/{id}")
    public ResponseEntity<MarksDTO> getMarksById(@PathVariable Long id){

        return ResponseEntity.ok(marksService.getMarksById(id));

    }

    @PutMapping("/{id}")
    public ResponseEntity<MarksDTO> updateMarks(@PathVariable Long id,
                                                @Valid @RequestBody MarksDTO dto){

        return ResponseEntity.ok(marksService.updateMarks(id,dto));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMarks(@PathVariable Long id){

        marksService.deleteMarks(id);

        return ResponseEntity.ok("Marks deleted successfully");

    }

}