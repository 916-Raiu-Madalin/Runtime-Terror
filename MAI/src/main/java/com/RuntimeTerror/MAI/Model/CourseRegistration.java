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
@IdClass(CourseRegistrationKey.class)
public class CourseRegistration {

    @Id
    Long appUserId;

    @Id
    Long courseId;

    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id")
    AppUser appUser;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    Disciplines course;

    public CourseRegistration(Long appUserId, Long courseId, int grade){
        this.appUserId = appUserId;
        this.courseId = courseId;
        this.grade = grade;
    }
//    LocalDateTime registeredAt;

    int grade;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CourseRegistration that = (CourseRegistration) o;
        return appUserId != null && Objects.equals(appUserId, that.appUserId)
                && courseId != null && Objects.equals(courseId, that.courseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appUserId, courseId);
    }
}
