package com.aivle.bookserver.book;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private static final HttpClient httpClient = HttpClient.newHttpClient();

    @Value("${openai.api-key}")
    private String openaiApiKey;

    @GetMapping
    public List<Book> getBooks(@RequestParam(required = false) String category) {
        return bookService.getBooks(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBook(id));
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody BookUpdateRequest req) {
        if (req.title() == null || req.title().isBlank()) {
            throw new IllegalArgumentException("제목을 입력해주세요.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(req.toEntity()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                                @Valid @RequestBody BookUpdateRequest req) {
        return ResponseEntity.ok(bookService.updateBook(id, req));
    }

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

    @GetMapping("/{id}/related")
    public ResponseEntity<List<Book>> getRelated(@PathVariable Long id) {
        Book book = bookService.getBook(id);
        return ResponseEntity.ok(bookService.getRelatedTop3(id, book.getCategory()));
    }

    @PostMapping("/ai-intro")
    public ResponseEntity<String> getAiIntro(@RequestBody Map<String, String> body) {
        try {
            String title = body.get("title");
            String author = body.get("author");

            String prompt = String.format(
                "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"user\",\"content\":\"\\\"%s\\\" (%s) 책을 한 문장으로 매력적으로 소개해줘. 30자 이내로.\"}],\"max_tokens\":100}",
                title, author
            );

            var request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + openaiApiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(prompt))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.status(response.statusCode()).body(response.body());
        } catch (Exception e) {
            log.error("AI 소개 생성 오류", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": {\"message\": \"AI 소개 생성 중 오류가 발생했습니다.\"}}");
        }
    }

    //표지 이미지 생성 기능
    /*
    @PostMapping("/image/generate")
    public ResponseEntity<String> proxyImageGeneration(@RequestBody String body,
                                                        @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            var requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/images/generations"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body));

            if (authHeader != null) {
                requestBuilder.header("Authorization", authHeader);
            }

            HttpRequest request = requestBuilder.build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.status(response.statusCode()).body(response.body());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": {\"message\": \"" + e.getMessage() + "\"}}");
        }
    }
    */
}