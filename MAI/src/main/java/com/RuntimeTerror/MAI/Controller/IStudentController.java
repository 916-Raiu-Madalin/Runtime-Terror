package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Student;

public interface IStudentController {
    Student saveStudent(Student student);
    Student findByUsername(String username);
}
