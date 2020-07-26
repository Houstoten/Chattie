package com.bsa.houston.chattie.messages;

import com.bsa.houston.chattie.messages.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Message, UUID> {

    public List<Message> findAllByUserId(UUID userId);

}
