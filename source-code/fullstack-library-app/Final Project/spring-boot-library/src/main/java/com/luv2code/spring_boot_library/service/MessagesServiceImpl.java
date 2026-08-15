package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Message;
import com.luv2code.spring_boot_library.repository.MessageRepository;
import com.luv2code.spring_boot_library.requestmodel.AdminQuestionRequest;
import com.luv2code.spring_boot_library.requestmodel.MessageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessagesServiceImpl implements MessagesService {

    private final MessageRepository messageRepository;

    public MessagesServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }


    @Override
    @Transactional
    public Message postMessage(String userEmail, MessageRequest request) {
        Message message = new Message(request.getTitle(), request.getQuestion());
        message.setUserEmail(userEmail);
        message.setClosed(false);
        return messageRepository.save(message);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Message> getMessagesByUser(String userEmail, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, "id"));
        return messageRepository.findByUserEmail(userEmail, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Message> getOpenMessages(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.DESC, "id"));
        return messageRepository.findByClosed(false, pageable);
    }

    @Override
    @Transactional
    public Message putMessages(String adminEmail, AdminQuestionRequest request) throws Exception {
        Message message = messageRepository.findById(request.getId())
                .orElseThrow(() -> new Exception("Message not found"));
        if (message.isClosed()) {
            throw new Exception("Message is already closed");
        }
        message.setAdminEmail(adminEmail);
        message.setResponse(request.getResponse());
        message.setClosed(true);
        return messageRepository.save(message);
    }
}









