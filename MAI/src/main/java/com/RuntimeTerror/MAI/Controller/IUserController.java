package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.AppUser;
import com.RuntimeTerror.MAI.Model.Role;

import java.util.List;

public interface IUserController {
    AppUser saveUser(AppUser appUser);
    Role saveRole(Role role);
    AppUser getUser(String username);
    List<AppUser> getUsers();


}
