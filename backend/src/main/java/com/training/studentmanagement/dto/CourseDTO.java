package com.training.studentmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {

    private Long id;

    @NotBlank
    private String courseName;

    @NotBlank
    private String courseCode;

    @NotNull
    private Integer credits;

    private Long facultyId;

}