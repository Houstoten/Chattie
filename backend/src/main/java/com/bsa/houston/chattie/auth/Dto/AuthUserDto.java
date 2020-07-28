package com.bsa.houston.chattie.auth.Dto;

import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthUserDto {
    private String token;
    private UserResponseDto user;
}
