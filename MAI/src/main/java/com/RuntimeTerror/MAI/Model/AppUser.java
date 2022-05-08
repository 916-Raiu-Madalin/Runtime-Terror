package com.RuntimeTerror.MAI.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String username;
    private String password;
    private String emailAddress;


    @JsonIgnore
    @OneToMany(mappedBy = "student")
    Set<CourseRegistration> registrations;

    @ManyToOne
    private Role role;

}
