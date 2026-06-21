package com.example.ai_expense_tracker.exception;

public class CategoryNotFoundException extends RuntimeException{
    public CategoryNotFoundException(Long accountId) {
        super("Category not found with id " + accountId);
    }
}
