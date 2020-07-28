package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.users.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    public Optional<User> findUserByNameAndPassword(String name, String password);

    public Optional<User> findUserByName(String name);

    public Optional<User> findUserByIdAndPassword(UUID id, String s);

    public Optional<User> findUserByIdAndPasswordAndAdmin(UUID id, String password, Boolean admin);

    public Optional<List<User>> findUsersByAdmin(Boolean admin);
}
