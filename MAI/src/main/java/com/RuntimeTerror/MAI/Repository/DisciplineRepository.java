package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.AppUser;
import com.RuntimeTerror.MAI.Model.Disciplines;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisciplineRepository extends JpaRepository<Disciplines, Long> {
    Disciplines findByName(String username);
}
