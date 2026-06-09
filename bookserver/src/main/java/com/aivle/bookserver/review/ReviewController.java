package com.aivle.bookserver.review;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<Review> getReviews(@RequestParam Long bookId) {
        return reviewService.getReviews(bookId);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.createReview(review));
    }

    /**
     * 현재: FE가 클라이언트에서 password 검증 후 호출 → 서버는 단순 삭제
     * BE2 이관 시: 요청에 password 추가하여 서버 검증으로 전환
     */
    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id); // deleteReview() 예외 처리
        return ResponseEntity.noContent().build();
    }
}
