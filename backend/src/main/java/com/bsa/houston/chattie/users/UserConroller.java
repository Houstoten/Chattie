package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import com.bsa.houston.chattie.users.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserConroller {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<UserResponseDto> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/create")
    public UserResponseDto createUser(@RequestBody UserCreateDto userCreateDto){
        return userService.createUser(userCreateDto);
    }

}
