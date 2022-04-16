package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.AuthenticationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.RuntimeTerror.MAI.Model.AppUser;
import com.RuntimeTerror.MAI.Repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class HomeController {
    private final UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {


        return ResponseEntity.ok(userRepository.findByUsername(payload.get("username")).getRole().getName());
    }
}
