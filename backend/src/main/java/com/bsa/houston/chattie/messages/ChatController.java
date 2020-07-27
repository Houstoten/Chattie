package com.bsa.houston.chattie.messages;

import com.bsa.houston.chattie.messages.Dto.MessageEditReceiveDto;
import com.bsa.houston.chattie.messages.Dto.MessageReceiveDto;
import com.bsa.houston.chattie.messages.Dto.MessageResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/messages")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping
    public List<MessageResponseDto> getAllMessages(@RequestParam(required = false) UUID userId) {
        return chatService.getAllMessages(Optional.ofNullable(userId));
    }

    @GetMapping("/{id}")
    public MessageResponseDto getMessageById(@PathVariable UUID id){
        return chatService.getMessageById(id);
    }

    @PostMapping
    public MessageResponseDto postMessage(@RequestBody MessageReceiveDto messageReceiveDto) {
        return chatService.postMessage(messageReceiveDto);
    }

    @PutMapping
    public void editMessage(@RequestBody MessageEditReceiveDto messageEditReceiveDto) {
        chatService.editMessage(messageEditReceiveDto);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable UUID id) {
        chatService.deleteMessage(id);
    }
}
