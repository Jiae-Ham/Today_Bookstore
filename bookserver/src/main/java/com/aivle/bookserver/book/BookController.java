package com.aivle.bookserver.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

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
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(book));
    }

    // try-catch 대신 getBook() 예외 처리
    @PatchMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                        @RequestBody BookUpdateRequest req) {
        return ResponseEntity.ok(bookService.updateBook(id, req));  // updateBook -> getBook() 메서드에서 예외 처리
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
}
