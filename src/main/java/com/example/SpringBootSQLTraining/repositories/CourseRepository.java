package com.example.SpringBootSQLTraining.repositories;

import com.example.SpringBootSQLTraining.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
