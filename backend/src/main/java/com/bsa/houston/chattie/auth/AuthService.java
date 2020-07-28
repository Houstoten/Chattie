package com.bsa.houston.chattie.auth;

import com.bsa.houston.chattie.auth.Dto.AuthUserDto;
import com.bsa.houston.chattie.auth.Model.AuthUser;
import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import com.bsa.houston.chattie.users.Model.User;
import com.bsa.houston.chattie.users.UserRepository;
import com.bsa.houston.chattie.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public AuthUserDto register(UserCreateDto userDto) throws Exception {
        User user = userDto.toUser();
        //user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return login(userDto);
    }

    public AuthUserDto login(UserCreateDto user) throws Exception {
        Authentication auth;
        try {
            auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user, user.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        var currentUser = (AuthUser) auth.getPrincipal();
        final var userDetails = userRepository.findById(currentUser.getId());
        final String jwt = tokenService.generateToken(currentUser);
        return new AuthUserDto(jwt, userDetails.map(UserResponseDto::fromUser).orElseThrow());
    }
}
