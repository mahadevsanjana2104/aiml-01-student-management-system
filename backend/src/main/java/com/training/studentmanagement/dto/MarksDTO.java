package com.training.studentmanagement.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarksDTO {

    private Long id;

    private Long studentId;

    private Long courseId;

    private Integer internalMarks;

    private Integer externalMarks;

    private Integer totalMarks;

    private String grade;

}