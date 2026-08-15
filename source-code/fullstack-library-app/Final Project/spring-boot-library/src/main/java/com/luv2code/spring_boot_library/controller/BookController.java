package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public Page<Book> getAllBooks(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize) {
        return bookService.getAllBooks(pageNo, pageSize);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search/title")
    public Page<Book> findByTitleContaining(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize) {
        return bookService.findByTitleContaining(title, pageNo, pageSize);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/search/category")
    public Page<Book> findByCategory(
            @RequestParam String category,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize) {
        return bookService.findByCategory(category, pageNo, pageSize);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }
}















