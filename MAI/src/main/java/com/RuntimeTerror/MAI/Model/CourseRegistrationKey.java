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

    @Column(name="student_id")
    private Long studentId;

    @Column(name="course_id")
    private Long courseId;
}
