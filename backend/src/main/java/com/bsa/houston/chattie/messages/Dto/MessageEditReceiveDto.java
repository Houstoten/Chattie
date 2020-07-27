package com.bsa.houston.chattie.messages.Dto;

import com.bsa.houston.chattie.messages.Model.Message;
import lombok.Data;

import java.util.UUID;

@Data
public class MessageEditReceiveDto {
    private String text;
    private UUID messageId;

    public Message toMessage() {
        return Message.builder()
                .text(text)
                .id(messageId)
                .build();
    }
}
