package com.bsa.houston.chattie.users;

import com.bsa.houston.chattie.Exceptions.WrongCredentialsException;
import com.bsa.houston.chattie.users.Dto.UserCreateDto;
import com.bsa.houston.chattie.users.Dto.UserCreateResponseDto;
import com.bsa.houston.chattie.users.Dto.UserLoginDto;
import com.bsa.houston.chattie.users.Dto.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
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
        if (userRepository.findUserByName(userCreateDto.getUsername()).isEmpty()) {
            return UserCreateResponseDto.fromUser(userRepository.save(userCreateDto.toUser()));
        } else {
            throw new RuntimeException();
        }
    }

    public UserCreateResponseDto loginUser(UserLoginDto userLoginDto) throws NoSuchAlgorithmException {
        var a = userRepository.findUserByName(userLoginDto.getUsername());
        var b = DatatypeConverter.printHexBinary(MessageDigest
                .getInstance("SHA-256")
                .digest(userLoginDto.getPassword().getBytes(StandardCharsets.UTF_8)));
        return userRepository.findUserByNameAndPassword(userLoginDto.getUsername(), DatatypeConverter.printHexBinary(MessageDigest
                .getInstance("SHA-256")
                .digest(userLoginDto.getPassword().getBytes(StandardCharsets.UTF_8))))
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
}
