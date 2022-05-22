package com.RuntimeTerror.MAI.Api;

import com.RuntimeTerror.MAI.Controller.IStudentController;
import com.RuntimeTerror.MAI.Model.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class StudentService {
    private final IStudentController studentController;

    @GetMapping("/students/{group}")
    public ResponseEntity<List<Student>> getStudents(@PathVariable Long group) {
        return ResponseEntity.ok().body(studentController.findByGroup(group));
    }
}
