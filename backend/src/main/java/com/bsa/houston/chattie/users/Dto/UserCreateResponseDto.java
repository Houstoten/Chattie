package com.bsa.houston.chattie.users.Dto;

import com.bsa.houston.chattie.users.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserCreateResponseDto {
    private UUID id;
    private String token;
    private boolean admin;

    public static UserCreateResponseDto fromUser(User user) {
        return new UserCreateResponseDto(user.getId(), user.getPassword(), user.isAdmin());
    }
}
