package com.bsa.houston.chattie.auth;

import com.bsa.houston.chattie.auth.Dto.AuthUserDto;
import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AuthUserDto signUp(@RequestBody UserCreateDto user) throws Exception {
        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthUserDto login(@RequestBody UserCreateDto user) throws Exception {
        return authService.login(user);
    }
}
