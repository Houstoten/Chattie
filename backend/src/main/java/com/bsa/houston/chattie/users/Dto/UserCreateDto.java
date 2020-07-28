package com.bsa.houston.chattie.users.Dto;

import com.bsa.houston.chattie.users.Model.User;
import lombok.Data;

import java.security.NoSuchAlgorithmException;

@Data
public class UserCreateDto {
    private String username;
    private String password;
    private String avatar;
    private Boolean admin;

    public User toUser() throws NoSuchAlgorithmException {
        return User.builder()
                .name(username)
                .avatar(avatar)
                .password(password)
                .admin(admin)
                .build();
    }

    public User fromUserTo(User user) {
        user.setName(username);
        user.setPassword(password);
        user.setAvatar(avatar);
        user.setAdmin(admin);
        return user;
    }
}
