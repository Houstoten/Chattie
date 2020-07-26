package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
