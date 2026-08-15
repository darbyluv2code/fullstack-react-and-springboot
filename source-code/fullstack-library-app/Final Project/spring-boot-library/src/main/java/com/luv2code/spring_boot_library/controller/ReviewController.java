package com.luv2code.spring_boot_library.controller;

import com.luv2code.spring_boot_library.entity.Review;
import com.luv2code.spring_boot_library.requestmodel.ReviewRequest;
import com.luv2code.spring_boot_library.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/book/{bookId}")
    public Page<Review> getReviewsByBookId(
            @PathVariable Long bookId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        return reviewService.getReviewsByBookId(bookId, pageNo, pageSize);
    }

    @GetMapping("/book/{bookId}/average-rating")
    public Double getAverageRating(@PathVariable Long bookId) {
        return reviewService.getAverageRating(bookId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Review createReview(@Valid @RequestBody ReviewRequest reviewRequest, Authentication authentication) throws Exception {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");

        if (userEmail == null || userEmail.isEmpty()) {
            throw new IllegalArgumentException("User email not found in token");
        }

        return reviewService.createReview(userEmail, reviewRequest);
    }
}
