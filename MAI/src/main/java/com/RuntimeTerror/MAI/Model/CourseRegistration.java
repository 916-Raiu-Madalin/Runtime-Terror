package com.RuntimeTerror.MAI.Model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@ToString
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseRegistration {

    @EmbeddedId
    CourseRegistrationKey id;

    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id")
    AppUser appUser;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    Disciplines course;

    public CourseRegistration(CourseRegistrationKey key, int grade){
        this.id = key;
        this.grade = grade;
    }
//    LocalDateTime registeredAt;

    int grade;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CourseRegistration that = (CourseRegistration) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
