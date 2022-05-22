package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.PendingDiscipline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PendingDisciplinesRepository extends JpaRepository<PendingDiscipline, Long > {
    List<PendingDiscipline> getPendingDisciplinesByTeacher_Username(String teacher);
}
