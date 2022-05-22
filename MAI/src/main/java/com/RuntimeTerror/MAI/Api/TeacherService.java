package com.RuntimeTerror.MAI.Api;

import com.RuntimeTerror.MAI.Controller.ITeacherController;
import com.RuntimeTerror.MAI.Controller.IUserController;
import com.RuntimeTerror.MAI.Model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TeacherService {
    private final IUserController userController;
    private final ITeacherController teacherController;

    @PostMapping("/add_optional")
    ResponseEntity<?> addOptional(@RequestParam Map<String, String> discipline) {
        Teacher teacher = teacherController.findByUsername(discipline.get("teacher"));
        long count = teacher.getDisciplines().stream().filter(disc -> disc.getType().equals("optional")).count();
        if (count >= 2) {
            return ResponseEntity.ok().body("Too many optionals");
        }
        count += userController.getPendingDisciplines(teacher.getName()).size();
        if (count >= 2) {
            return ResponseEntity.ok().body("Too many optionals");
        }
        Integer noCredits = Integer.parseInt(discipline.get("credits"));
        Integer semester = Integer.parseInt(discipline.get("semester"));
        PendingDiscipline pendingDiscipline = new PendingDiscipline(discipline.get("discipline"), teacher, noCredits, semester);
        userController.savePendingDiscipline(pendingDiscipline);
        return ResponseEntity.ok().body("Optional successfully added!");
    }

    @GetMapping("/get_optionals")
    ResponseEntity<List<Disciplines>> getOptionals(@RequestParam String teacher) {
        Teacher teacher1 = teacherController.findByUsername(teacher);
        return ResponseEntity.ok().body(teacher1.getDisciplines().stream().filter(discipline -> discipline.getType().equals("optional")).collect(Collectors.toList()));
    }

    @PostMapping("/approve_optional/{id}/{noStudents}")
    ResponseEntity<?> approveOptional(@PathVariable Long id, @PathVariable Integer noStudents) {
        userController.approveDiscipline(id, noStudents);
        return ResponseEntity.ok().body("Optional successfully approved!");
    }

    @GetMapping("/get_disciplines/{teacher}")
    ResponseEntity<?> getDisciplines(@PathVariable String teacher) {
        Teacher teacher1 = teacherController.findByUsername(teacher);
        return ResponseEntity.ok().body(teacher1.getDisciplines());
    }
    @GetMapping("/teachers")
    ResponseEntity<List<Teacher>> getTeachers(){
        return ResponseEntity.ok().body(this.teacherController.findAll());
    }
    @GetMapping("/get_disciplines_all")
    ResponseEntity<?> getDisciplines(){
        List<Teacher> teachers = teacherController.findAll();
    @GetMapping("/get_registrations/{teacher}")
    ResponseEntity<?> getRegistrations(@PathVariable String teacher) {
        Teacher teacher1 = teacherController.findByUsername(teacher);
        Map<String, Set<CourseRegistration>> disciplines = new HashMap<>();
        teacher1.getDisciplines().forEach(disciplines1 -> disciplines.put(disciplines1.getName(), disciplines1.getRegistrations()));
        return ResponseEntity.ok().body(disciplines);

    }
    @PostMapping("/grade/{courseId}/{studentId}/{grade}")
    ResponseEntity<?> gradeStudent(@PathVariable Long courseId, @PathVariable Long studentId, @PathVariable int grade){
        teacherController.grade(courseId, studentId, grade);
        return ResponseEntity.ok().body("Student successfully graded");
    }

    @GetMapping("/get_disciplines_all")
    ResponseEntity<?> getDisciplines(){
        List<Teacher> teachers = teacherController.getAll();
        Map<String, Set<Disciplines>> disciplines = new HashMap<>();
        teachers.forEach(teacher -> disciplines.put(teacher.getName(), teacher.getDisciplines()));
        return ResponseEntity.ok().body(disciplines);
    }
}
