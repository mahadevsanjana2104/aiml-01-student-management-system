package com.training.studentmanagement.repository;

import com.training.studentmanagement.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    boolean existsByEmail(String email);

}