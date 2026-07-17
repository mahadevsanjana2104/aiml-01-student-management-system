package com.training.studentmanagement.controller;

import com.training.studentmanagement.dto.CourseDTO;
import com.training.studentmanagement.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseDTO> addCourse(
            @Valid @RequestBody CourseDTO dto){

        return new ResponseEntity<>(
                courseService.addCourse(dto),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAllCourses(){

        return ResponseEntity.ok(courseService.getAllCourses());

    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(
            @PathVariable Long id){

        return ResponseEntity.ok(courseService.getCourseById(id));

    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDTO> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseDTO dto){

        return ResponseEntity.ok(
                courseService.updateCourse(id,dto));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(
            @PathVariable Long id){

        courseService.deleteCourse(id);

        return ResponseEntity.ok("Course deleted successfully");

    }

}