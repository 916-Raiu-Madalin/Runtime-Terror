package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.*;
import com.RuntimeTerror.MAI.Repository.*;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class UserController implements IUserController, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ProfileRepository profileRepository;
    private final DisciplineRepository disciplineRepository;
    private final RegisterRepository registerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final PendingDisciplinesRepository pendingDisciplinesRepository;

    @Override
    public AppUser saveUser(AppUser appUser) {

        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);
        Profile profile = new Profile();
        profile.setAppUser(appUser);
        profile.setId(appUser.getId());
        saveProfile(profile);
        AppUser returnUser = userRepository.save(appUser);
        if ("ROLE_STUDENT".equals(appUser.getRole().getName())) {
            Student newStudent = new Student(appUser.getUsername(), appUser.getName());
            studentRepository.save(newStudent);
        }
        if ("ROLE_TEACHER".equals(appUser.getRole().getName()) || "ROLE_TEACHER_CHIEF".equals(appUser.getRole().getName())) {
            Teacher newTeacher = new Teacher(appUser.getUsername(), appUser.getName());
            teacherRepository.save(newTeacher);
        }
        return returnUser;
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
    public Disciplines saveDiscipline(Disciplines disciplines) {
        return disciplineRepository.save(disciplines);
    }

    @Override
    public CourseRegistration saveRegistration(CourseRegistration registration) {
        return registerRepository.save(registration);
    }

    @Override
    public List<CourseRegistration> getRegistrations() {
        return registerRepository.findAll();
    }

    @Override
    public List<CourseRegistration> getRegistrationsForAppUser(String username) {
        return registerRepository.findCourseRegistrationByStudent_Username(username);
    }

    @Override
    public Disciplines getDiscipline(String name) {
        return disciplineRepository.findByName(name);
    }

    @Override
    public List<PendingDiscipline> getPendingDisciplines() {
        return pendingDisciplinesRepository.findAll();
    }

    @Override
    public List<PendingDiscipline> getPendingDisciplines(String teacher) {
        return pendingDisciplinesRepository.getPendingDisciplinesByTeacher_Username(teacher);
    }

    @Override
    public Disciplines approveDiscipline(Long id) {
        PendingDiscipline pendingDiscipline = pendingDisciplinesRepository.getById(id);
        Disciplines disciplines = new Disciplines(pendingDiscipline.getName(), "optional", pendingDiscipline.getTeacher(), pendingDiscipline.getNoCredits());
        disciplineRepository.save(disciplines);
        disciplines.getTeacher().addDiscipline(disciplines);
        pendingDisciplinesRepository.delete(pendingDiscipline);
        return disciplines;
    }

    @Override
    public PendingDiscipline savePendingDiscipline(PendingDiscipline pendingDiscipline) {
        return pendingDisciplinesRepository.save(pendingDiscipline);
    }


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
    public List<Disciplines> getCompulsoryDisciplines() {
        return this.disciplineRepository.findAll().stream().filter(discipline -> discipline.getType().equals("compulsory")).collect(Collectors.toList());
    }

    @Override
    public List<Disciplines> getCompulsoryDisciplines(Integer year, Integer semester) {
        return this.disciplineRepository.findAll().stream().filter(discipline -> "compulsory".equals(discipline.getType()) && year.equals(discipline.getYear()) && semester.equals(discipline.getSemester())).collect(Collectors.toList());
    }

    @Override
    public List<Disciplines> getOptionalDisciplines(Integer year, Integer semester) {
        return this.disciplineRepository.findAll().stream().filter(discipline -> "optional".equals(discipline.getType()) && year.equals(discipline.getYear()) && semester.equals(discipline.getSemester())).collect(Collectors.toList());
    }

    @Override
    public List<Disciplines> getOptionalDisciplines() {
        return this.disciplineRepository.findAll().stream().filter(discipline -> discipline.getType().equals("optional")).collect(Collectors.toList());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username);
        if (appUser == null)
            throw new UsernameNotFoundException("User not found in the database");
        return new org.springframework.security.core.userdetails.User(appUser.getUsername(), appUser.getPassword(), Collections.singleton(new SimpleGrantedAuthority(appUser.getRole().getName())));
    }
}
