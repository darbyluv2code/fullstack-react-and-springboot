package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Book;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BookService {
    Page<Book> getAllBooks(int pageNo, int pageSize);

    Page<Book> findByTitleContaining(String title, int pageNo, int pageSize);

    Page<Book> findByCategory(String category, int pageNo, int pageSize);

    Book getBookById(Long id);
}
