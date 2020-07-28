package com.bsa.houston.chattie.messages.Dto;

import com.bsa.houston.chattie.messages.Model.Message;
import com.bsa.houston.chattie.users.Model.User;
import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Builder
@Data
public class MessageResponseDto {
    private UUID id;
    private UUID userId;
    private String avatar;
    private String user;
    private String text;
    private ZonedDateTime createdAt;
    private ZonedDateTime editedAt;
    private Set<UUID> likes;

    public static MessageResponseDto fromMessage(Message message) {
        return MessageResponseDto.builder()
                .id(message.getId())
                .userId(message.getUser().getId())
                .avatar(message.getUser().getAvatar())
                .user(message.getUser().getName())
                .text(message.getText())
                .createdAt(message.getCreatedAt())
                .editedAt(message.getEditedAt())
                .likes(message
                        .getLikes()
                        .stream()
                        .map(User::getId)
                        .collect(Collectors.toSet()))
                .build();
    }
}
