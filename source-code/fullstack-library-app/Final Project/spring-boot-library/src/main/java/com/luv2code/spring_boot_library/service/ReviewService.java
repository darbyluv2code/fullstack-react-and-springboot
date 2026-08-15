package com.luv2code.spring_boot_library.service;

import com.luv2code.spring_boot_library.entity.Review;
import com.luv2code.spring_boot_library.requestmodel.ReviewRequest;
import org.springframework.data.domain.Page;

public interface ReviewService {
    Page<Review> getReviewsByBookId(Long bookId, int pageNo, int pageSize);
    Review createReview(String userEmail, ReviewRequest reviewRequest) throws Exception;

    Double getAverageRating(Long bookId);
}
