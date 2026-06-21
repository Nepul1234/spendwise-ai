package com.example.ai_expense_tracker.service.category;

import com.example.ai_expense_tracker.model.Category;

import java.util.List;

public interface CategoryService {
    boolean existsByUserAndCategory(String appUserId, Long aLong);

  List<Category> getAllWithoutUserId();

  Category getByName(String category);
}
