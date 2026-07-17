package com.training.studentmanagement.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseSummaryDTO {

    private Long id;

    private String courseName;

    private String courseCode;
}