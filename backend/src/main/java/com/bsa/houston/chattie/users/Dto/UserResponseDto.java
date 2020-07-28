package com.bsa.houston.chattie.users.Dto;

import com.bsa.houston.chattie.users.Model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {
    private String name;
    private String avatar;

    public static UserResponseDto fromUser(User user){
        return UserResponseDto.builder()
                .name(user.getName())
                .avatar(user.getAvatar())
                .build();
    }
}
