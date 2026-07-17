package com.training.studentmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "marks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    private Integer internalMarks;

    private Integer externalMarks;

    private Integer totalMarks;

    private String grade;

}