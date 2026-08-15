package com.luv2code.spring_boot_library.responsemodels;

import java.time.LocalDate;

public class ShelfCurrentLoansResponse {

    private Long id;
    private String title;
    private String author;
    private String description;
    private String img;
    private LocalDate checkoutDate;
    private LocalDate returnDate;
    private int daysLeft;

    public ShelfCurrentLoansResponse() {}

    public ShelfCurrentLoansResponse(Long id, String title, String author, String description, String img, LocalDate checkoutDate, LocalDate returnDate, int daysLeft) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.daysLeft = daysLeft;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public LocalDate getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(LocalDate checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public int getDaysLeft() {
        return daysLeft;
    }

    public void setDaysLeft(int daysLeft) {
        this.daysLeft = daysLeft;
    }
}
