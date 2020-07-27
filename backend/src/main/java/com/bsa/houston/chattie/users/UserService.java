package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream().map(UserResponseDto::fromUser).collect(Collectors.toList());
    }

    public UserResponseDto createUser(UserCreateDto userCreateDto) {
        return UserResponseDto.fromUser(userRepository.save(userCreateDto.toUser()));
    }
}
