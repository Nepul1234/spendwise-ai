package com.example.ai_expense_tracker.service.ai;

import com.example.ai_expense_tracker.model.TransactionType;

public record AiParseResult(
    TransactionType type,
    String description,
    Double amount,
    String date,
    String errorMessage,
    String category
) {
}
