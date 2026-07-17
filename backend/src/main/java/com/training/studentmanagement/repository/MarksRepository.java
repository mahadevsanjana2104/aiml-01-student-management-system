package com.training.studentmanagement.repository;

import com.training.studentmanagement.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarksRepository extends JpaRepository<Marks,Long> {

}