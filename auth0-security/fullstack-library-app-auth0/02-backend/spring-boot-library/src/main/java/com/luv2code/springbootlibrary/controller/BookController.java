package com.luv2code.springbootlibrary.controller;

import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.responsemodels.ShelfCurrentLoansResponse;
import com.luv2code.springbootlibrary.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@AuthenticationPrincipal Jwt jwt)
        throws Exception
    {
        String userEmail = jwt.getClaim("email");
        return bookService.currentLoans(userEmail);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@AuthenticationPrincipal Jwt jwt) {
        String userEmail = jwt.getClaim("email");
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@AuthenticationPrincipal Jwt jwt,
                                      @RequestParam Long bookId) {
        String userEmail = jwt.getClaim("email");
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook (@AuthenticationPrincipal Jwt jwt,
                              @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaim("email");
        return bookService.checkoutBook(userEmail, bookId);
    }

    @PutMapping("/secure/return")
    public void returnBook(@AuthenticationPrincipal Jwt jwt,
                           @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaim("email");
        bookService.returnBook(userEmail, bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@AuthenticationPrincipal Jwt jwt,
                          @RequestParam Long bookId) throws Exception {
        String userEmail = jwt.getClaim("email");
        bookService.renewLoan(userEmail, bookId);
    }

}












