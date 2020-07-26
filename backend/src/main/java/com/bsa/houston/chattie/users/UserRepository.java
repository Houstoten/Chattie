package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.users.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
