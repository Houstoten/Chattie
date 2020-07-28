package com.bsa.houston.chattie.messages;

import com.bsa.houston.chattie.Exceptions.WrongCredentialsException;
import com.bsa.houston.chattie.messages.Dto.MessageEditReceiveDto;
import com.bsa.houston.chattie.messages.Dto.MessageReceiveDto;
import com.bsa.houston.chattie.messages.Dto.MessageResponseDto;
import com.bsa.houston.chattie.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/messages")
public class ChatController {

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(WrongCredentialsException.class)
    public void handleForbidden() {
    }

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<MessageResponseDto>> getAllMessages(@RequestParam(required = false) UUID userId
            , @RequestHeader UUID id, @RequestHeader String token) {
        try {
            userService.checkCredentials(id, token, Optional.empty());
            return ResponseEntity.status(HttpStatus.OK).body(chatService.getAllMessages(Optional.ofNullable(userId)));
        } catch (WrongCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public MessageResponseDto getMessageById(@PathVariable UUID id) {
        return chatService.getMessageById(id);
    }

    @PostMapping
    public ResponseEntity<MessageResponseDto> postMessage(@RequestBody MessageReceiveDto messageReceiveDto
            , @RequestHeader UUID id, @RequestHeader String token) {
        try {
            userService.checkCredentials(id, token, Optional.empty());
            return ResponseEntity.status(HttpStatus.OK).body(chatService.postMessage(messageReceiveDto));
        } catch (WrongCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping
    public void editMessage(@RequestBody MessageEditReceiveDto messageEditReceiveDto
            , @RequestHeader UUID id, @RequestHeader String token) {
        try {
            userService.checkCredentials(id, token, Optional.empty());
            chatService.editMessage(messageEditReceiveDto);
        } catch (WrongCredentialsException e) {
            System.out.println(e.getMessage());
        }
    }

    @PutMapping("/like/{mid}")
    public void likeMessage(@PathVariable UUID mid, @RequestParam UUID userId
            , @RequestHeader UUID id, @RequestHeader String token) {
        try {
            userService.checkCredentials(id, token, Optional.empty());
            chatService.likeMessage(mid, userId);
        } catch (WrongCredentialsException e) {
            System.out.println(e.getMessage());
        }
    }

    @DeleteMapping("/{mid}")
    public void deleteMessage(@PathVariable UUID mid
            , @RequestHeader UUID id, @RequestHeader String token) {
        try {
            userService.checkCredentials(id, token, Optional.empty());
            chatService.deleteMessage(mid);
        } catch (WrongCredentialsException e) {
            System.out.println(e.getMessage());
        }
    }
}
