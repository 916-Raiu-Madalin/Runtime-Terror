package com.RuntimeTerror.MAI.Api;

import com.RuntimeTerror.MAI.Controller.IUserController;
import com.RuntimeTerror.MAI.Model.AppUser;
import com.RuntimeTerror.MAI.Model.CourseRegistration;
import com.RuntimeTerror.MAI.Model.Disciplines;
import com.RuntimeTerror.MAI.Model.Profile;
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

    @GetMapping("/registrations")
    public ResponseEntity<List<CourseRegistration>> getRegistrations() {
        return ResponseEntity.ok().body(registrationsController.getRegistrations());
    }

    @GetMapping("/disciplines/compulsory")
    public ResponseEntity<List<Disciplines>> getCompulsoryDisciplines() {
        return ResponseEntity.ok().body(this.disciplinesController.getCompulsoryDisciplines());
    }

    @GetMapping("/disciplines/optional")
    public ResponseEntity<List<Disciplines>> getOptionalDisciplines() {
        return ResponseEntity.ok().body(this.disciplinesController.getOptionalDisciplines());
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseRegistration>> getCourses(@RequestParam String username) {
        return ResponseEntity.ok().body(registrationsController.getRegistrationsForAppUser(username));
    }
<<<<<<< Updated upstream
=======

        @PostMapping("/courses")
    public ResponseEntity<?> setCourses(@RequestParam Map<String, String> profile) {
        AppUser user = userController.getUser(profile.get("username"));
        CourseRegistration course = registrationsController.getRegistrationByName(profile.get("course_name"));
        userController.saveRegistration(course);
        return ResponseEntity.ok().body(profile);
    }


    @PostMapping("/enrol")
    public ResponseEntity<String> enrollToYear(@RequestParam Integer year) {
        this.userController.enrollToYear(year);
        return ResponseEntity.ok().body("");
    }
>>>>>>> Stashed changes
}
