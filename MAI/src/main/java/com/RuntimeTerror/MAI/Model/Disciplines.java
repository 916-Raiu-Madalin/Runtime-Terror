package com.RuntimeTerror.MAI.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Disciplines {

    @Id
    Long id;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    Set<CourseRegistration> registrations;
}
