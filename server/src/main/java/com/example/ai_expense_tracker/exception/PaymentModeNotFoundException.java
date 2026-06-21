package com.example.ai_expense_tracker.exception;

public class PaymentModeNotFoundException extends RuntimeException{
    public PaymentModeNotFoundException(Long accountId) {
        super("Payment Mode not found with id " + accountId);
    }
}
