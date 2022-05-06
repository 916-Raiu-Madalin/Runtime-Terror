package com.RuntimeTerror.MAI.Api;

import com.RuntimeTerror.MAI.Controller.IUserController;
import com.RuntimeTerror.MAI.Model.AppUser;
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

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(userController.getUsers());
    }
    @GetMapping("/profile")
    public ResponseEntity<Profile> getProfile(@RequestParam String username){
        Profile profile = userController.getProfile(username);
        return ResponseEntity.ok().body(profile);
    }
    @PostMapping("/profile")
    public ResponseEntity<?> setProfile(@RequestBody Map<String, String> profile){
        return ResponseEntity.ok().body(profile);
    }
}
