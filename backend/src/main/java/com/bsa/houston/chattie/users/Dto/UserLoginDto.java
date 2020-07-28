package com.bsa.houston.chattie.users.Dto;

import com.bsa.houston.chattie.users.Model.User;
import lombok.Data;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Data
public class UserLoginDto {
    private String username;
    private String password;

    public User toUser() throws NoSuchAlgorithmException {
        return User.builder()
                .name(username)
                .password(DatatypeConverter.printHexBinary(MessageDigest
                        .getInstance("SHA-256")
                        .digest(password.getBytes(StandardCharsets.UTF_8))))
                .build();
    }
}
