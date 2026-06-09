package com.aivle.bookserver.book;

import jakarta.validation.Valid;
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

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookService.getBook(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@Valid @RequestBody BookUpdateRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(req.toEntity()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id,
                                           @RequestBody BookUpdateRequest req) {
        try {
            return ResponseEntity.ok(bookService.updateBook(id, req));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/related")
    public ResponseEntity<List<Book>> getRelated(@PathVariable Long id) {
        try {
            Book book = bookService.getBook(id);
            return ResponseEntity.ok(bookService.getRelatedTop3(id, book.getCategory()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
