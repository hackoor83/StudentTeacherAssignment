package com.example.SpringBootSQLTraining.controllers;

import com.example.SpringBootSQLTraining.models.Teacher;
import com.example.SpringBootSQLTraining.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Teacher> getTeachers(){
        return teacherRepository.findAll();
    }

    @PostMapping
    public void addTeacher(@RequestBody Teacher teacher){
        teacherRepository.save(teacher);
    }

    @DeleteMapping("{id}")
    public void removeTeacher(@PathVariable Long id){
        teacherRepository.deleteById(id);
    }

//    @PutMapping("/update/{id}")
//    public void updateTeacher(@RequestBody Teacher teacher, @PathVariable Long id){
//        teacher.setId(id);
//        teacherRepository.save(teacher);
//    }

}
