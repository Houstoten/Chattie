package com.bsa.houston.chattie.messages.Dto;

import com.bsa.houston.chattie.messages.Model.Message;
import com.bsa.houston.chattie.users.Model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class MessageReceiveDto {
    private String text;
    private UUID userId;

    public Message toMessage() {
        return Message.builder()
                .text(text)
                .user(User.builder()
                        .id(userId)
                        .build())
                .build();
    }
}
