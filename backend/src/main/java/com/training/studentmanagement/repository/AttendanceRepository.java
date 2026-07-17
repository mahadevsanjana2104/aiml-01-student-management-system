package com.training.studentmanagement.repository;

import com.training.studentmanagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;


@Repository
public interface AttendanceRepository extends JpaRepository<Attendance,Long>{

    boolean existsByStudentIdAndCourseIdAndDate(
            Long studentId,
            Long courseId,
            LocalDate date
    );

}