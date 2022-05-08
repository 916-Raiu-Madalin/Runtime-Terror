package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.CourseRegistration;
import com.RuntimeTerror.MAI.Model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegisterRepository extends JpaRepository<CourseRegistration, Long> {
    List<CourseRegistration> findCourseRegistrationByAppUser_Username(String username);
}
