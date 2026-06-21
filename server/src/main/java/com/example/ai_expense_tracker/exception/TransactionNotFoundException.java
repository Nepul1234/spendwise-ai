package com.example.ai_expense_tracker.exception;

public class TransactionNotFoundException extends RuntimeException{
    public TransactionNotFoundException(Long accountId) {
        super("Transaction not found with id " + accountId);
    }
}
