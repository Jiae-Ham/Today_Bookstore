package com.aivle.bookserver.review;

import lombok.Getter;
import lombok.Setter;

// 리뷰 삭제 시 사용하는 DTO (비밀번호 확인용)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDeleteRequest {
    private String password;
}