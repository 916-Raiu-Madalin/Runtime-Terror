package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.Student;
import com.RuntimeTerror.MAI.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentController implements IStudentController {
    private final StudentRepository studentRepository;


    @Override
    public Student saveStudent(Student student) {
        return this.studentRepository.save(student);
    }

    @Override
    public Student findByUsername(String username) {
        return this.studentRepository.findByUsername(username);
    }

}
