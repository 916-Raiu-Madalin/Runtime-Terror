package com.RuntimeTerror.MAI.Api;

import com.RuntimeTerror.MAI.Controller.IUserController;
import com.RuntimeTerror.MAI.Model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserResource {
    private final IUserController userController;
    private final IUserController disciplinesController;
    private final IUserController registrationsController;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(userController.getUsers());
    }

    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile(@RequestParam String username) {
        Profile profile = userController.getProfile(username);
        return ResponseEntity.ok().body(profile);
    }

    @PostMapping("/profile")
    public ResponseEntity<?> setProfile(@RequestParam Map<String, String> profile) {
        AppUser user = userController.getUser(profile.get("username"));
        Profile profile1 = new Profile(user.getId(), user, profile.get("firstname"), profile.get("lastname"), profile.get("email"), profile.get("city"));
        userController.saveProfile(profile1);
        return ResponseEntity.ok().body(profile);


    }

    @GetMapping("/disciplines")
    public ResponseEntity<List<Disciplines>> getDisciplines() {
        return ResponseEntity.ok().body(disciplinesController.getDiscipline());
    }

    @GetMapping("/pending_disciplines")
    public ResponseEntity<List<PendingDiscipline>> getPendingDisciplines() {
        return ResponseEntity.ok().body(disciplinesController.getPendingDisciplines());
    }

    @GetMapping("/pending_disciplines/{teacher}")
    public ResponseEntity<List<PendingDiscipline>> getPendingDisciplines(@PathVariable String teacher) {
        return ResponseEntity.ok().body(disciplinesController.getPendingDisciplines(teacher));
    }


    @GetMapping("/registrations")
    public ResponseEntity<List<CourseRegistration>> getRegistrations() {
        return ResponseEntity.ok().body(registrationsController.getRegistrations());
    }

    @GetMapping("/disciplines/compulsory")
    @ResponseBody
    public ResponseEntity<List<Disciplines>> getCompulsoryDisciplines(@RequestParam Integer year, @RequestParam Integer semester) {
        System.out.println(year + "<->" + semester);
        return ResponseEntity.ok().body(this.disciplinesController.getCompulsoryDisciplines(year, semester));
    }

    @GetMapping("/disciplines/optional")
    @ResponseBody
    public ResponseEntity<List<Disciplines>> getOptionalDisciplines(@RequestParam Integer year, @RequestParam Integer semester) {
        return ResponseEntity.ok().body(this.disciplinesController.getOptionalDisciplines(year, semester));
    }

    @GetMapping("/disciplines/compulsory/all")
    @ResponseBody
    public ResponseEntity<List<Disciplines>> getCompulsoryDisciplines() {
        return ResponseEntity.ok().body(this.disciplinesController.getCompulsoryDisciplines());
    }

    @GetMapping("/disciplines/optional/all")
    @ResponseBody
    public ResponseEntity<List<Disciplines>> getOptionalDisciplines() {
        return ResponseEntity.ok().body(this.disciplinesController.getOptionalDisciplines());
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseRegistration>> getCourses(@RequestParam String username) {
        return ResponseEntity.ok().body(registrationsController.getRegistrationsForAppUser(username));
    }


    @PostMapping("/enrol")
    public ResponseEntity<String> enrollToYear(@RequestParam Integer year) {
        this.userController.enrollToYear(year);
        return ResponseEntity.ok().body("");
    }
}
