package com.aivle.bookserver.book;

import java.net.http.HttpClient;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private static final HttpClient httpClient = HttpClient.newHttpClient();

    @GetMapping
    public List<Book> getBooks(@RequestParam(required = false) String category) {
        return bookService.getBooks(category);
    }

    // try-catch 대신 getBook() 예외 처리
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBook(id));  // getBook 예외 처리
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody BookUpdateRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(req.toEntity()));
    }

    // try-catch 대신 getBook() 예외 처리
    @PatchMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                        @RequestBody BookUpdateRequest req) {
        return ResponseEntity.ok(bookService.updateBook(id, req));  // updateBook -> getBook() 메서드에서 예외 처리
    }

    // 표지 url 엔드포인트 (미션7)
    @PatchMapping("/{id}/cover")
    public ResponseEntity<Book> updateBookCover(@PathVariable Long id,
                                                @RequestBody Map<String, String> body) {
        String coverImageUrl = body.get("coverImageUrl");
        if (coverImageUrl == null) {
            throw new IllegalArgumentException("coverImageUrl 필드는 필수입니다.");
        }
        return ResponseEntity.ok(bookService.updateBookCover(id, coverImageUrl));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    // try-catch 대신 getBook() 예외 처리
    @GetMapping("/{id}/related")
    public ResponseEntity<List<Book>> getRelated(@PathVariable Long id) {
        Book book = bookService.getBook(id);    // getBook 예외 처리
        return ResponseEntity.ok(bookService.getRelatedTop3(id, book.getCategory()));
    }

    // CORS 오류 해결 용 표지 이미지 생성 기능 프록시, 미션 7의 기능 구현으로 제거 
    // @PostMapping("/image/generate")
    // public ResponseEntity<String> proxyImageGeneration(@RequestBody String body,
    //                                                     @RequestHeader(value = "Authorization", required = false) String authHeader) {
    //     try {
    //         var requestBuilder = HttpRequest.newBuilder()
    //                 .uri(URI.create("https://api.openai.com/v1/images/generations"))
    //                 .header("Content-Type", "application/json")
    //                 .POST(HttpRequest.BodyPublishers.ofString(body));

    //         if (authHeader != null) {
    //             requestBuilder.header("Authorization", authHeader);
    //         }

    //         HttpRequest request = requestBuilder.build();
    //         HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    //         return ResponseEntity.status(response.statusCode()).body(response.body());
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
    //                 .body("{\"error\": {\"message\": \"" + e.getMessage() + "\"}}");
    //     }
    // }
}
