package com.RuntimeTerror.MAI.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Student {

    public Student(String username, String name){
        this.username = username;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="group_id")
    private Long group;

    private String username;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "student")
    @ToString.Exclude
    Set<CourseRegistration> registrations = new HashSet<>();

}
