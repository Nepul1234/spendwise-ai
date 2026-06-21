package com.example.ai_expense_tracker.service.category;

import com.example.ai_expense_tracker.model.Category;
import com.example.ai_expense_tracker.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepo categoryRepo;

  @Override
  public boolean existsByUserAndCategory(String appUserId, Long categoryId) {
    return categoryRepo.existsByAppUserIdAndCategoryId(appUserId, categoryId) || categoryRepo.existsById(categoryId);
  }

  @Override
  public List<Category> getAllWithoutUserId() {
    return categoryRepo.findAllByAppUserIsNull();
  }

  @Override
  public Category getByName(String category) {
    return categoryRepo.findByName(category)
        .orElseThrow(() -> new RuntimeException("Category not found with name " + category));
  }
}
