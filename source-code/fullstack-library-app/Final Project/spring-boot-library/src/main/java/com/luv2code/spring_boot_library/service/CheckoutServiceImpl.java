package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.entity.Checkout;
import com.luv2code.spring_boot_library.repository.BookRepository;
import com.luv2code.spring_boot_library.repository.CheckoutRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final BookRepository bookRepository;
    private final CheckoutRepository checkoutRepository;

    public CheckoutServiceImpl(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    @Override
    @Transactional
    public Book checkoutBook(String userEmail, Long bookId) throws Exception {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new Exception("Book not found"));

        Checkout existingCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (existingCheckout != null) {
            throw new Exception("Book already checked out by this user");
        }

        if (book.getCopiesAvailable() <= 0) {
            throw new Exception("Book is not available for checkout");
        }

        book.setCopiesAvailable(book.getCopiesAvailable() - 1);
        bookRepository.save(book);

        LocalDate checkoutDate = LocalDate.now();
        LocalDate returnDate = checkoutDate.plusWeeks(2);

        Checkout checkout = new Checkout(userEmail, checkoutDate, returnDate, bookId);
        checkoutRepository.save(checkout);

        return book;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isBookCheckedOutByUser(String userEmail, Long bookId) {
        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        return checkout != null;
    }
}














