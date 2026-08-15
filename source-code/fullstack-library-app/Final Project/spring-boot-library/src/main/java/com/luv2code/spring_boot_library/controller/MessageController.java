package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Message;
import com.luv2code.spring_boot_library.requestmodel.AdminQuestionRequest;
import com.luv2code.spring_boot_library.requestmodel.MessageRequest;
import com.luv2code.spring_boot_library.service.MessagesService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessagesService messagesService;

    public MessageController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    private String extractEmail(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");

        if (userEmail == null || userEmail.isEmpty()) {
            throw new IllegalArgumentException("User email not found in token");
        }
        return userEmail;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Message postMessage(@Valid @RequestBody MessageRequest request, Authentication authentication) {
        String userEmail = extractEmail(authentication);
        return messagesService.postMessage(userEmail, request);
    }

    @GetMapping
    public Page<Message> getUserMessages (
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            Authentication authentication) {

        String userEmail = extractEmail(authentication);
        return messagesService.getMessagesByUser(userEmail, pageNo, pageSize);
    }

    @GetMapping("/admin")
    public Page<Message> getOpenMessages(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize) {
        return messagesService.getOpenMessages(pageNo, pageSize);
    }

    @PutMapping("/admin")
    public Message putMessage(@Valid @RequestBody AdminQuestionRequest request,
                              Authentication authentication) throws Exception {
        String adminEmail = extractEmail(authentication);
        return messagesService.putMessages(adminEmail, request);
    }
}













