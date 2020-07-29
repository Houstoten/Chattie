package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.Exceptions.WrongCredentialsException;
import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import com.bsa.houston.chattie.users.Dto.UserCreateResponseDto;
import com.bsa.houston.chattie.users.Dto.UserLoginDto;
import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import com.bsa.houston.chattie.users.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserResponseDto> getAllUsers() throws NoSuchAlgorithmException {
        return userRepository.findAll().stream().map(UserResponseDto::fromUser).collect(Collectors.toList());
    }

    public UserCreateResponseDto createUser(UserCreateDto userCreateDto) throws NoSuchAlgorithmException {
        if (userCreateDto.getId().isPresent()) {
            var user = userRepository.findById(userCreateDto.getId().get());
            if (user.isEmpty()) {
                return UserCreateResponseDto.fromUser(userRepository.save(userCreateDto.toUser()));
            } else {
                return UserCreateResponseDto.fromUser(userRepository.save(userCreateDto.fromUserTo(user.get())));
            }
        }else {
            return UserCreateResponseDto.fromUser(userRepository.save(userCreateDto.toUser()));
        }
    }

    public UserCreateResponseDto loginUser(UserLoginDto userLoginDto) throws NoSuchAlgorithmException {
        return userRepository.findUserByUsernameAndPassword(userLoginDto.getUsername(), userLoginDto.getPassword())
                .map(UserCreateResponseDto::fromUser)
                .orElseThrow(WrongCredentialsException::new);
    }

    public void checkCredentials(UUID id, String token, Optional<Boolean> admin) throws WrongCredentialsException {
        if (admin.isEmpty()) {
            userRepository.findUserByIdAndPassword(id, token).orElseThrow(WrongCredentialsException::new);
        } else {
            userRepository.findUserByIdAndPasswordAndAdmin(id, token, true).orElseThrow(WrongCredentialsException::new);
        }
    }

    public User getUserById(UUID userId, String adminPassword, UUID adminId) {
        if (userRepository.findUserByIdAndPasswordAndAdmin(adminId, adminPassword, true).isPresent()) {
            return userRepository.findById(userId).orElseThrow();
        } else {
            throw new WrongCredentialsException();
        }
    }
}
