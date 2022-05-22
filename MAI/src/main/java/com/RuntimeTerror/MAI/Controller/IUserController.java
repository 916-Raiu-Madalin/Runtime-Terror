package com.RuntimeTerror.MAI.Controller;

import com.RuntimeTerror.MAI.Model.*;

import java.util.List;

public interface IUserController {
    AppUser saveUser(AppUser appUser);

    Role saveRole(Role role);

    AppUser getUser(String username);

    List<AppUser> getUsers();

    Profile saveProfile(Profile profile);

    Profile getProfile(String username);

    Disciplines saveDiscipline(Disciplines disciplines);

    Disciplines getDiscipline(String name);

    List<PendingDiscipline> getPendingDisciplines();

    List<PendingDiscipline> getPendingDisciplines(String teacher);

    Disciplines approveDiscipline(Long id, Integer noStudents);

    PendingDiscipline savePendingDiscipline(PendingDiscipline pendingDiscipline);

    List<Disciplines> getDiscipline();

    List<Disciplines> getCompulsoryDisciplines();

    List<Disciplines> getCompulsoryDisciplines(Integer year, Integer semester);

    List<Disciplines> getOptionalDisciplines();

    List<Disciplines> getOptionalDisciplines(Integer year, Integer semester);

    CourseRegistration saveRegistration(CourseRegistration registration);

    List<CourseRegistration> getRegistrations();

    List<CourseRegistration> getRegistrationsForAppUser(String username);

    void enrollToYear(Integer year);
}
