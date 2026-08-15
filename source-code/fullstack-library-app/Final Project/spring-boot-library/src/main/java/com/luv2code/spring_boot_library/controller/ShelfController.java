package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentLoansResponse;
import com.luv2code.spring_boot_library.responsemodels.ShelfHistoryResponse;
import com.luv2code.spring_boot_library.service.ShelfService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/shelf")
public class ShelfController {

    private final ShelfService shelfService;

    public ShelfController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }

    @GetMapping("/loans")
    @ResponseStatus(HttpStatus.OK)
    public Page<ShelfCurrentLoansResponse> currentLoans(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            Authentication authentication) throws Exception {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");

        return shelfService.currentLoans(userEmail, page, size);
    }

    @PutMapping("/return/{bookId}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> returnBook (
            @PathVariable Long bookId,
            Authentication authentication) throws Exception {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");

        shelfService.returnBook(userEmail, bookId);

        return Map.of("message", "Book returned successfully");
    }

    @GetMapping("/history")
    @ResponseStatus(HttpStatus.OK)
    public Page<ShelfHistoryResponse> loansHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            Authentication authentication) throws Exception {

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");

        return shelfService.loansHistory(userEmail, page, size);
    }


















}
