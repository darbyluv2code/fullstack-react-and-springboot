package com.luv2code.springbootlibrary.controller;

import com.luv2code.springbootlibrary.entity.Message;
import com.luv2code.springbootlibrary.requestmodels.AdminQuestionRequest;
import com.luv2code.springbootlibrary.service.MessagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@AuthenticationPrincipal Jwt jwt,
                            @RequestBody Message messageRequest) {
        String userEmail = jwt.getClaim("email");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@AuthenticationPrincipal Jwt jwt,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = jwt.getClaim("email");
        List<String> roles = jwt.getClaimAsStringList("https://luv2code-react-library.com/roles");
        String admin = roles != null && !roles.isEmpty() ? roles.get(0) : null;
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        messagesService.putMessage(adminQuestionRequest, userEmail);
    }

}














