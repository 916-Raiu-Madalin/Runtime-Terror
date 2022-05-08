package com.RuntimeTerror.MAI.Model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseRegistrationKey implements Serializable {

    @Column(name="app_user_id")
    private Long appUserId;

    @Column(name="course_id")
    private Long courseId;
}
