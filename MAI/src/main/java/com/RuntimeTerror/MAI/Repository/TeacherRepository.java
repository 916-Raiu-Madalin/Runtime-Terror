package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Teacher findByUsername(String username);
}
