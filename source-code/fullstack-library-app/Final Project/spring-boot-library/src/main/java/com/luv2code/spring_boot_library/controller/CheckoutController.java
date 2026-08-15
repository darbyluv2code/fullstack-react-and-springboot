package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.service.CheckoutService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/checkouts")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Book checkoutBook(@RequestBody Map<String, Long> request, Authentication authentication)
            throws Exception {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");
        Long bookId = request.get("bookId");

        return checkoutService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/status/{bookId}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Boolean> checkCheckoutStatus(@PathVariable Long bookId, Authentication authentication)
            throws Exception {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");

        boolean isCheckedOut = checkoutService.isBookCheckedOutByUser(userEmail, bookId);

        return Map.of("isCheckedOut", isCheckedOut);
    }
}














