package com.RuntimeTerror.MAI.Api;

import com.RuntimeTerror.MAI.Controller.ITeacherController;
import com.RuntimeTerror.MAI.Controller.IUserController;
import com.RuntimeTerror.MAI.Model.AppUser;
import com.RuntimeTerror.MAI.Model.CourseRegistration;
import com.RuntimeTerror.MAI.Model.Disciplines;
import com.RuntimeTerror.MAI.Model.Teacher;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TeacherService {
    private final IUserController userController;
    private final ITeacherController teacherController;

    @PostMapping("/add_optional")
    ResponseEntity<?> addOptional(@RequestParam Map<String, String> discipline){
        Teacher teacher = teacherController.findByUsername(discipline.get("teacher"));
        if(teacher.getDisciplines().stream().filter(disc -> disc.getType().equals("optional")).count() >=2){
            return ResponseEntity.ok().body("Too many optionals");
        }
        Disciplines disciplines = new Disciplines(discipline.get("discipline"), "optional", teacher);
        userController.saveDiscipline(disciplines);
        teacher.addDiscipline(disciplines);
        return ResponseEntity.ok().body("Optional successfully added!");
    }

    @GetMapping("/get_optionals")
    ResponseEntity<List<Disciplines>> getOptionals(@RequestParam String teacher){
        Teacher teacher1 = teacherController.findByUsername(teacher);
        return ResponseEntity.ok().body(teacher1.getDisciplines().stream().filter(discipline -> discipline.getType().equals("optional")).collect(Collectors.toList()));
    }

}
