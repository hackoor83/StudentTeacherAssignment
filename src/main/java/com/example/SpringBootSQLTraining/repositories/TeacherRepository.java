package com.example.SpringBootSQLTraining.repositories;

import com.example.SpringBootSQLTraining.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
