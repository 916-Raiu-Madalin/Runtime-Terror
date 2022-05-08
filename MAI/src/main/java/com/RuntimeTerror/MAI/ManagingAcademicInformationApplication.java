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

            Set<CourseRegistration> courses = new HashSet<CourseRegistration>();
            AppUser a=userController.getUser("vasi123");
            Disciplines d=userController.getDiscipline("Algebra");
            Disciplines d1=userController.getDiscipline("OOP");
            CourseRegistration e = new CourseRegistration(1L,a,d, 10);
            CourseRegistration ee = new CourseRegistration(2L,a,d1,9);
            System.out.println(e.getCourse().getName());
//            System.out.println();
            System.out.println(e.getGrade());
            System.out.println(e.getAppUser().getName());
//            System.out.println(e.getCourse().getRegistrations());
            System.out.println(e.getCourse().getName());



//            courses.add(e);
//            courses.add(ee);


//              userController.saveRegistration(ee);
//            userController.getUser("vasi123").setRegistrations(courses);
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(ManagingAcademicInformationApplication.class, args);
    }

}
