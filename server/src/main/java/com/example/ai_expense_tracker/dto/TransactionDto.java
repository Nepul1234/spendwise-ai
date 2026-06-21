package com.example.ai_expense_tracker.dto;

public record TransactionDto(
    String transactionId,
    String type,
    String description,
    Double amount,
    String transactionDate,
    String transferId,
    String categoryName,
    String accountName,
    String paymentModeName,
    Long createdAt
) {
}
