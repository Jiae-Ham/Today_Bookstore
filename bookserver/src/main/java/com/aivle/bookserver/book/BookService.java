package com.aivle.bookserver.book;
import com.aivle.bookserver.review.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDateTime;
import com.aivle.bookserver.exception.BookNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final ReviewRepository reviewRepository;

    @Transactional(readOnly = true)
    public List<Book> getBooks(String category) {
        if (category != null && !category.isBlank()) {
            return bookRepository.findByCategory(category);
        }
        return bookRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Book getBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id)); // 예외 처리
    }

    @Transactional
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Transactional
    public Book updateBook(Long id, BookUpdateRequest req) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id));

        if (req.title()         != null) book.setTitle(req.title());
        if (req.author()        != null) book.setAuthor(req.author());
        if (req.content()       != null) book.setContent(req.content());
        if (req.category()      != null) book.setCategory(req.category());
        if (req.coverImageUrl() != null) book.setCoverImageUrl(req.coverImageUrl());
        if (req.avgRating()     != null) book.setAvgRating(req.avgRating());
        if (req.ratePoint()     != null) book.setRatePoint(req.ratePoint());
        if (req.reviewCount()   != null) book.setReviewCount(req.reviewCount());
        
        return bookRepository.save(book);
    }

    @Transactional
    public void deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            reviewRepository.deleteAllByBookId(id);
            bookRepository.deleteById(id);
        } else {
            throw new BookNotFoundException(id);
        }
    }

    @Transactional(readOnly = true)
    public List<Book> getRelatedTop3(Long bookId, String category) {
        return bookRepository.findTop3ByCategoryAndIdNotOrderByRatePointDesc(category, bookId);
    }
}
