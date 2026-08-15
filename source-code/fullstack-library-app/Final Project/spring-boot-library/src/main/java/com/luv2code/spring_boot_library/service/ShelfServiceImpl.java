package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Book;
import com.luv2code.spring_boot_library.entity.Checkout;
import com.luv2code.spring_boot_library.entity.History;
import com.luv2code.spring_boot_library.repository.BookRepository;
import com.luv2code.spring_boot_library.repository.CheckoutRepository;
import com.luv2code.spring_boot_library.repository.HistoryRepository;
import com.luv2code.spring_boot_library.responsemodels.ShelfCurrentLoansResponse;
import com.luv2code.spring_boot_library.responsemodels.ShelfHistoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShelfServiceImpl implements ShelfService {

    private final CheckoutRepository checkoutRepository;
    private final BookRepository bookRepository;
    private final HistoryRepository historyRepository;

    public ShelfServiceImpl(CheckoutRepository checkoutRepository, BookRepository bookRepository, HistoryRepository historyRepository) {
        this.checkoutRepository = checkoutRepository;
        this.bookRepository = bookRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ShelfCurrentLoansResponse> currentLoans(String userEmail, int pageNo, int pageSize) throws Exception {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Checkout> checkouts = checkoutRepository.findByUserEmail(userEmail, pageable);

        List<ShelfCurrentLoansResponse> loansResponses = new ArrayList<>();

        for (Checkout checkout : checkouts.getContent()) {
            Optional<Book> bookOptional = bookRepository.findById(checkout.getBookId());
            if (bookOptional.isPresent()) {
                Book book = bookOptional.get();
                int daysLeft = (int) ChronoUnit.DAYS.between(LocalDate.now(), checkout.getReturnDate());

                ShelfCurrentLoansResponse loanResponse = new ShelfCurrentLoansResponse(
                        book.getId(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getDescription(),
                        book.getImg(),
                        checkout.getCheckoutDate(),
                        checkout.getReturnDate(),
                        daysLeft
                );
                loansResponses.add(loanResponse);
            }
        }

        return new PageImpl<>(loansResponses, pageable, checkouts.getTotalElements());
    }

    @Override
    @Transactional
    public void returnBook(String userEmail, Long bookId) throws Exception {

        Checkout checkout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (checkout == null) {
            throw new Exception("Book is not checked out by this user");
        }

        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (!bookOptional.isPresent()) {
            throw new Exception("Book not found");
        }

        Book book = bookOptional.get();

        History history = new History(
                userEmail,
                checkout.getCheckoutDate(),
                LocalDate.now(),
                bookId
        );
        historyRepository.save(history);

        checkoutRepository.delete(checkout);

        book.setCopiesAvailable(book.getCopiesAvailable() + 1);
        bookRepository.save(book);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ShelfHistoryResponse> loansHistory(String userEmail, int pageNo, int pageSize) throws Exception {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<History> histories = historyRepository.findByUserEmailOrderByReturnedDateDesc(userEmail, pageable);

        List<ShelfHistoryResponse> historyResponses = new ArrayList<>();

        for (History history : histories.getContent()) {
            Optional<Book> bookOptional = bookRepository.findById(history.getBookId());

            if (bookOptional.isPresent()) {
                Book book = bookOptional.get();
                ShelfHistoryResponse historyResponse = new ShelfHistoryResponse(
                        history.getId(),
                        history.getUserEmail(),
                        history.getCheckoutDate(),
                        history.getReturnedDate(),
                        book.getTitle(),
                        book.getAuthor(),
                        book.getDescription(),
                        book.getImg()
                );
                historyResponses.add(historyResponse);
            }
        }
        return new PageImpl<>(historyResponses, pageable, histories.getTotalElements());
    }
}
