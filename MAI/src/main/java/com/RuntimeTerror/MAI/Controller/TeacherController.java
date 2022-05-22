package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.CourseRegistration;
import com.RuntimeTerror.MAI.Model.Student;
import com.RuntimeTerror.MAI.Model.Teacher;
import com.RuntimeTerror.MAI.Repository.RegisterRepository;
import com.RuntimeTerror.MAI.Repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class TeacherController implements ITeacherController {
    private final TeacherRepository teacherRepository;
    private final RegisterRepository registerRepository;

    @Override
    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher findByUsername(String username) {
        return teacherRepository.findByUsername(username);
    }

    public void grade(Long courseId, Long studentId, int grade) {
        CourseRegistration courseRegistration = registerRepository.findByCourseIdAndStudentId(courseId, studentId);
        courseRegistration.setGrade(grade);
        Student student = courseRegistration.getStudent();
        List<CourseRegistration> filtered = student.getRegistrations().stream().filter(courseRegistration1 ->
                Objects.equals(courseRegistration1.getCourse().getSemester(), courseRegistration.getCourse().getSemester())).collect(Collectors.toList());
        int sum = filtered.stream().mapToInt(CourseRegistration::getGrade).reduce(0, Integer::sum);
        Integer average = sum / filtered.size();
        switch (courseRegistration.getCourse().getSemester()) {
            case 1:
                student.setSem1Grade(average);
                break;
            case 2:
                student.setSem2Grade(average);
                break;
            case 3:
                student.setSem3Grade(average);
                break;
            case 4:
                student.setSem4Grade(average);
                break;
            case 5:
                student.setSem5Grade(average);
                break;
            case 6:
                student.setSem6Grade(average);
                break;
            default:
                break;

        }
    }

    @Override
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

}
