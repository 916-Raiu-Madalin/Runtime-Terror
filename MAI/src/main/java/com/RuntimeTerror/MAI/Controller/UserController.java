package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.AppUser;
import com.RuntimeTerror.MAI.Model.Disciplines;
import com.RuntimeTerror.MAI.Model.Profile;
import com.RuntimeTerror.MAI.Model.Role;
import com.RuntimeTerror.MAI.Repository.DisciplineRepository;
import com.RuntimeTerror.MAI.Repository.ProfileRepository;
import com.RuntimeTerror.MAI.Repository.RoleRepository;
import com.RuntimeTerror.MAI.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional

public class UserController implements IUserController, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final DisciplineRepository disciplineRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public AppUser saveUser(AppUser appUser) {

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        Profile profile = new Profile();
        profile.setAppUser(appUser);
        profile.setId(appUser.getId());
        saveProfile(profile);
        return userRepository.save(appUser);
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Profile saveProfile(Profile profile){
        return profileRepository.save(profile);
    }

    @Override
    public Disciplines saveDiscipline(Disciplines disciplines){ return disciplineRepository.save(disciplines);}




    @Override
    public Profile getProfile(String username) {
        System.out.println(username);
        AppUser appUser = userRepository.findByUsername(username);
        if (appUser == null)
            throw new UsernameNotFoundException("User not found!");
        Long id = userRepository.findByUsername(username).getId();
        return profileRepository.getById(id);
    }

    @Override
    public AppUser getUser(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<AppUser> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Disciplines> getDiscipline() {
        return disciplineRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username);
        if (appUser == null)
            throw new UsernameNotFoundException("User not found in the database");
        return new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), Collections.singleton(new SimpleGrantedAuthority(appUser.getRole().getName())));
    }


}
