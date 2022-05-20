package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUsername(String username);
}
