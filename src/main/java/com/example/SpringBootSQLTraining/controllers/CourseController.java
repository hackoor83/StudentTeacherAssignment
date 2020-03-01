package com.example.SpringBootSQLTraining.controllers;

import com.example.SpringBootSQLTraining.models.Course;
import com.example.SpringBootSQLTraining.models.Teacher;
import com.example.SpringBootSQLTraining.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping
    public List<Course> getCourses(){
        return courseRepository.findAll();
    }

    @PostMapping
    public void addCourse(@RequestBody Course course){
        courseRepository.save(course);
    }

    @DeleteMapping("/delete/{id}")
    public void removeCourse(@PathVariable Long id){
        courseRepository.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public void updateCourse(@RequestBody Course course, @PathVariable Long id){
        course.setId(id);
        courseRepository.save(course);
    }

}
