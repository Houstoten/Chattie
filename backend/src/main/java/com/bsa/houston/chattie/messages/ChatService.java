package com.bsa.houston.chattie.messages;

import com.bsa.houston.chattie.messages.Dto.MessageEditReceiveDto;
import com.bsa.houston.chattie.messages.Dto.MessageReceiveDto;
import com.bsa.houston.chattie.messages.Dto.MessageResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<MessageResponseDto> getAllMessages(Optional<UUID> userId) {
        var messages = userId.isPresent() ? chatRepository.findAllByUserId(userId.get()) : chatRepository.findAll();
        return messages.stream().map(MessageResponseDto::fromMessage).collect(Collectors.toList());
    }

    public MessageResponseDto postMessage(MessageReceiveDto messageReceiveDto) {
        return MessageResponseDto.fromMessage(chatRepository.getOne(chatRepository.save(messageReceiveDto.toMessage()).getId()));
    }

    public void deleteMessage(UUID id) {
        chatRepository.deleteById(id);
    }

    public void editMessage(MessageEditReceiveDto messageEditReceiveDto) {
        chatRepository.save(messageEditReceiveDto.toMessage());
    }

    public MessageResponseDto getMessageById(UUID id) {
        return MessageResponseDto.fromMessage(chatRepository.getOne(id));
    }
}
