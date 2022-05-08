package com.RuntimeTerror.MAI.Model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Disciplines {

    @Id
    long id;
    private String name;

//    @OneToMany(mappedBy = "course")
//    Set<CourseRegistration> registrations ;
}
