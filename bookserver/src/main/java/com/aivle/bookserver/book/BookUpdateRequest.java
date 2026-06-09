package com.aivle.bookserver.book;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BookUpdateRequest(
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
) {}
