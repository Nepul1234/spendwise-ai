package com.example.ai_expense_tracker.service.transaction;

import com.example.ai_expense_tracker.dto.TransactionDto;
import com.example.ai_expense_tracker.dto.TransactionRequestDto;
import com.example.ai_expense_tracker.exception.InsufficientAccountBalanceException;

import java.util.List;

public interface TransactionsService {
    TransactionDto saveTransaction(String appUserId, TransactionRequestDto requestBody) throws InsufficientAccountBalanceException;

    List<TransactionDto> getAllTransactions(String appUserId);

    TransactionDto updateTransaction(String appUserId, TransactionRequestDto requestBody) throws InsufficientAccountBalanceException;

    void deleteTransaction(String appUserId, Long transactionId);
}
