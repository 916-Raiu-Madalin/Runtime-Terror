package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
