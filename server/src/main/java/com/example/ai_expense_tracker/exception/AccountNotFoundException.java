package com.example.ai_expense_tracker.exception;

public class AccountNotFoundException extends RuntimeException{
    public AccountNotFoundException(Long accountId) {
        super("Account not found with id " + accountId);
    }
}
