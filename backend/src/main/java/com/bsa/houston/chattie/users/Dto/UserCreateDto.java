package com.bsa.houston.chattie.users.Dto;

import com.bsa.houston.chattie.users.Model.User;
import lombok.Data;

@Data
public class UserCreateDto {
    private String name;
    private String avatar;

    public User toUser() {
        return User.builder()
                .name(name)
                .avatar(avatar)
                .build();
    }
}
