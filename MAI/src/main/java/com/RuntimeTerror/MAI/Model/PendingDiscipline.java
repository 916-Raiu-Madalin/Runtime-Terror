package com.RuntimeTerror.MAI.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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
public class PendingDiscipline {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String name;
    private String type;

    private Integer noCredits;

    private Integer semester;

    public PendingDiscipline(String name, Teacher teacher, Integer noCredits, Integer semester) {
        this.name = name;
        this.teacher = teacher;
        this.noCredits = noCredits;
        this.semester = semester;
    }

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        com.RuntimeTerror.MAI.Model.Disciplines that = (com.RuntimeTerror.MAI.Model.Disciplines) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}


