package com.aivle.bookserver.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(BookNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleBookNotFound(BookNotFoundException e) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse(
                                404,
                                e.getMessage(),
                                LocalDateTime.now()
                        ));
        }

        @ExceptionHandler(ReviewNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleReviewNotFound(ReviewNotFoundException e) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse(
                                404,
                                e.getMessage(),
                                LocalDateTime.now()
                        ));
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
                String message = e.getBindingResult().getFieldErrors()
                        .stream()
                        .map(f -> f.getDefaultMessage())
                        .findFirst()
                        .orElse("입력값이 올바르지 않습니다.");
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse(
                                400,
                                message,
                                LocalDateTime.now()
                        ));
        }

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException e) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse(
                                400,
                                e.getMessage(),
                                LocalDateTime.now()
                        ));
        }

        // Fallback Handler (예상하지 못한 예외 처리)
         @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleException(Exception e) {

                // 서버 로그 출력
                log.error("처리되지 않은 예외 발생", e);

                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ErrorResponse(
                                500,
                                "서버 오류가 발생했습니다.",
                                LocalDateTime.now()
                        ));
        }

}