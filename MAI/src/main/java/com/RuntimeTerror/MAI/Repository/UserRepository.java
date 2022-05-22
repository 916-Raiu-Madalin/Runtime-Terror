package com.RuntimeTerror.MAI.Repository;

import com.RuntimeTerror.MAI.Model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
