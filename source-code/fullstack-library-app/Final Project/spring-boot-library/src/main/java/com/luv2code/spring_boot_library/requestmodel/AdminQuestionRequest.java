package com.luv2code.spring_boot_library.requestmodel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdminQuestionRequest {

    @NotNull(message = "Id is required")
    private Long id;

    @NotBlank(message = "Response is required")
    private String response;

    public AdminQuestionRequest() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
