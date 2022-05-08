package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Teacher;

public interface ITeacherController {
     Teacher saveTeacher(Teacher teacher);
     Teacher findByUsername(String username);
}
