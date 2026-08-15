package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Book;

public interface CheckoutService {
    Book checkoutBook(String userEmail, Long bookId) throws Exception;

    boolean isBookCheckedOutByUser(String userEmail, Long bookId);
}
