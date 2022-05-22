package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Student;
import com.RuntimeTerror.MAI.Model.Teacher;

import java.util.List;

public interface ITeacherController {
     Teacher saveTeacher(Teacher teacher);
     Teacher findByUsername(String username);

    List<Teacher> findAll();


}
