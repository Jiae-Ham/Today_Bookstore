package com.aivle.bookserver.review;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 리뷰 삭제 시 사용하는 DTO (비밀번호 확인용)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDeleteRequest {
    @NotBlank
    private String password;
}