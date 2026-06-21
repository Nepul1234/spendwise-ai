package com.example.ai_expense_tracker.dto;

public record TransactionRequestDto(
    Long transactionId,
    String type,
    String description,
    Double amount,
    String transactionDate,
    Long paymentModeId,
    Long accountId,
    Long categoryId,
    Long toAccountId,
    String transferId
) {
}
