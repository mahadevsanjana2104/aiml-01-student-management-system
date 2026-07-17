package com.training.studentmanagement.dto;

import com.training.studentmanagement.entity.AttendanceStatus;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {

    private Long id;

    private Long studentId;

    private Long courseId;

    private LocalDate date;

    private AttendanceStatus status;

}