package com.aivle.bookserver.review;

import com.aivle.bookserver.rating.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RatingService ratingService;

    public List<Review> getReviews(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }

    @Transactional
    public Review createReview(Review review) {
        Review saved = reviewRepository.save(review);
        ratingService.recalculate(review.getBookId());
        return saved;
    }

    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰를 찾을 수 없습니다. id=" + reviewId));
        Long bookId = review.getBookId();
        reviewRepository.deleteById(reviewId);
        ratingService.recalculate(bookId);
    }
}
