package com.RuntimeTerror.MAI.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Teacher {

    public Teacher(String username, String name){
        this.name = name;
        this.username = username;
    }

    public void addDiscipline(Disciplines disciplines){
        this.disciplines.add(disciplines);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher")
    @ToString.Exclude
    private Set<Disciplines> disciplines = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Teacher teacher = (Teacher) o;
        return id != null && Objects.equals(id, teacher.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
