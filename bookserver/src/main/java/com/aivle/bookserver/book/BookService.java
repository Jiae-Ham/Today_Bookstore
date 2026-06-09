package com.aivle.bookserver.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getBooks(String category) {
        if (category != null && !category.isBlank()) {
            return bookRepository.findByCategory(category);
        }
        return bookRepository.findAll();
    }

    public Book getBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("도서를 찾을 수 없습니다. id=" + id));
    }

    @Transactional
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Transactional
    public Book updateBook(Long id, BookUpdateRequest req) {
        Book book = getBook(id);
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
        bookRepository.deleteById(id);
    }

    public List<Book> getRelatedTop3(Long bookId, String category) {
        return bookRepository.findTop3ByCategoryAndIdNotOrderByRatePointDesc(category, bookId);
    }
}
