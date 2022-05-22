package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Student;

import java.util.List;

public interface IStudentController {
    Student saveStudent(Student student);
    Student findByUsername(String username);
    List<Student> findByGroup(Long group);
    List<Student> getStudents(String sort);
    List<Student> getStudentsByYear(Integer year);
}
