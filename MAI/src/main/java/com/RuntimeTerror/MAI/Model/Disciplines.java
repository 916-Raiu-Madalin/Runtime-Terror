package com.RuntimeTerror.MAI.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@ToString
@Setter
@Getter
@NoArgsConstructor
public class Disciplines {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name="teacher_id")
    private Teacher teacher;

    private String type;

    public Disciplines(String name, String type, Teacher teacher){
        this.name = name;
        this.type = type;
        this.teacher = teacher;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    @ToString.Exclude
    Set<CourseRegistration> registrations = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Disciplines that = (Disciplines) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
