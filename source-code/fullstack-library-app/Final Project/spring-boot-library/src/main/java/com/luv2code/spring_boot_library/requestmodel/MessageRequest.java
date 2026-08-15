package com.luv2code.spring_boot_library.requestmodel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MessageRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 45, message = "Title must be at most 45 characters")
    private String title;

    @NotBlank(message = "Question is required")
    private String question;

    public MessageRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
