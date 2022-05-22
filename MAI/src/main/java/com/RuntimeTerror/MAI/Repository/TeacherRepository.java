package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Teacher findByUsername(String username);
    List<Teacher> findAll();
}
