package com.aivle.bookserver.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record BookUpdateRequest(
        @NotBlank(message = "제목을 입력해주세요.")
        String title,
        String author,
        String content,
        String category,
        String coverImageUrl,

        @JsonProperty("avg_rating")
        Double avgRating,

        @JsonProperty("rate_point")
        Double ratePoint,

        Integer reviewCount
) {
    public Book toEntity() {
        return Book.builder()
                .title(this.title)
                .author(this.author)
                .content(this.content)
                .category(this.category)
                .coverImageUrl(this.coverImageUrl)
                .avgRating(0.0)
                .ratePoint(0.0)
                .reviewCount(0)
                .build();
    }

}
