package com.RuntimeTerror.MAI;

import com.RuntimeTerror.MAI.Controller.IUserController;

import com.RuntimeTerror.MAI.Model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ManagingAcademicInformationApplication {

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner commandLineRunner(IUserController userController){
        return args -> {


        };
    }

    public static void main(String[] args) {
        SpringApplication.run(ManagingAcademicInformationApplication.class, args);
    }

}
