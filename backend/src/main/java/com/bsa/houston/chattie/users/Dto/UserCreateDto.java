package com.bsa.houston.chattie.users.Dto;

import com.bsa.houston.chattie.users.Model.User;
import lombok.Data;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.UUID;

@Data
public class UserCreateDto {
    private String username;
    private String password;
    private String avatar;
    private Boolean admin;
    private Optional<UUID> id;

    public User toUser() throws NoSuchAlgorithmException {
        return User.builder()
                .username(username)
                .avatar(avatar)
                .password(password)
                .admin(admin)
                .id(id.orElse(null))
                .build();
    }

    public User fromUserTo(User user) {
        user.setUsername(username);
        user.setPassword(password);
        user.setAvatar(avatar);
        user.setAdmin(admin);
        return user;
    }
}
