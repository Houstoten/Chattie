package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.Exceptions.WrongCredentialsException;
import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import com.bsa.houston.chattie.users.Dto.UserCreateResponseDto;
import com.bsa.houston.chattie.users.Dto.UserLoginDto;
import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import com.bsa.houston.chattie.users.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserConroller {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(@RequestHeader UUID id, @RequestHeader String token) throws NoSuchAlgorithmException {
        try {
            userService.checkCredentials(id, token, Optional.of(true));
            return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
        } catch (WrongCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<UserCreateResponseDto> createUser(@RequestBody UserCreateDto userCreateDto
            , @RequestHeader UUID id, @RequestHeader String token) throws NoSuchAlgorithmException {
        try {
            userService.checkCredentials(id, token, Optional.of(true));
            return ResponseEntity.status(HttpStatus.OK).body(userService.createUser(userCreateDto));
        } catch (WrongCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserCreateResponseDto> loginUser(@RequestBody UserLoginDto userLoginDto) throws NoSuchAlgorithmException {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.loginUser(userLoginDto));
        } catch (WrongCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserByIdDetailed(@PathVariable UUID userId
            , @RequestHeader UUID id, @RequestHeader String token) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(userId, token, id));
        } catch (WrongCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

}
