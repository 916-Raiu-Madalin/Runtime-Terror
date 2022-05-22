package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Teacher;
import com.RuntimeTerror.MAI.Repository.RegisterRepository;
import com.RuntimeTerror.MAI.Repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional

public class TeacherController implements ITeacherController {
    private final TeacherRepository teacherRepository;
    private final RegisterRepository registerRepository;

    @Override
    public Teacher saveTeacher(Teacher teacher){
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher findByUsername(String username) {
        return teacherRepository.findByUsername(username);
    }

    @Override
    public void grade(Long courseId, Long studentId, int grade) {
        registerRepository.findByCourseIdAndStudentId(courseId, studentId).setGrade(grade);
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }


}
