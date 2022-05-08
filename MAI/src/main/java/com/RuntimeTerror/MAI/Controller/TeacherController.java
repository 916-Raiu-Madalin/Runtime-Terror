package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Teacher;
import com.RuntimeTerror.MAI.Repository.TeacherRepository;
import com.RuntimeTerror.MAI.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional

public class TeacherController implements ITeacherController {
    private final TeacherRepository teacherRepository;

    @Override
    public Teacher saveTeacher(Teacher teacher){
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher findByUsername(String username) {
        return teacherRepository.findByUsername(username);
    }


}