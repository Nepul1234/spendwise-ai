package com.example.ai_expense_tracker.controller;

import com.example.ai_expense_tracker.dto.CategoryDto;
import com.example.ai_expense_tracker.service.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories() {
        return ResponseEntity.ok(
            categoryService.getAllWithoutUserId().stream()
                .map(c -> new CategoryDto(c.getId(), c.getName()))
                .toList()
        );
    }
}
