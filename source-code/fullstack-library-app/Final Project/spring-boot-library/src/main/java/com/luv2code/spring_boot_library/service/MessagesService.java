package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Message;
import com.luv2code.spring_boot_library.requestmodel.AdminQuestionRequest;
import com.luv2code.spring_boot_library.requestmodel.MessageRequest;
import org.springframework.data.domain.Page;

public interface MessagesService {
    Message postMessage(String userEmail, MessageRequest request);
    Page<Message> getMessagesByUser(String userEmail, int pageNo, int pageSize);
    Page<Message> getOpenMessages(int pageNo, int pageSize);
    Message putMessages(String adminEmail, AdminQuestionRequest request) throws Exception;
}
