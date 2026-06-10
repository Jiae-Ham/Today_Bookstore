package com.aivle.bookserver.review;

import lombok.Getter;
import lombok.Setter;

// 리뷰 등록 시 사용하는 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewCreateRequest {
    private Long bookId;
    private String nickname;
    private String password;
    private int rating;
    private String content;
}