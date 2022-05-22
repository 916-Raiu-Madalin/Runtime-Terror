package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Teacher;

import java.util.List;

public interface ITeacherController {
     Teacher saveTeacher(Teacher teacher);
     Teacher findByUsername(String username);
     void grade(Long courseId, Long studentId, int grade);

     List<Teacher> getAll();
}
