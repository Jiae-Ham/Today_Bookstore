package com.aivle.bookserver.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min
import lombok.Getter;
import lombok.Setter;

// 리뷰 등록 시 사용하는 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCreateRequest {
    private Long bookId;
    private String nickname;
    
    @NotBlank
    private String password;

    @Min(value = 1)
    @Max(value = 5)
    private int rating;
    private String content;
}