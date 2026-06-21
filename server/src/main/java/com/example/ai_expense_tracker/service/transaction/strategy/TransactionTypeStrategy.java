package com.example.ai_expense_tracker.service.transaction.strategy;

import com.example.ai_expense_tracker.dto.TransactionDto;
import com.example.ai_expense_tracker.dto.TransactionRequestDto;
import com.example.ai_expense_tracker.exception.InsufficientAccountBalanceException;
import com.example.ai_expense_tracker.model.TransactionType;

public interface TransactionTypeStrategy {
  TransactionDto process(String appUserId, TransactionRequestDto dto, OperationType type) throws InsufficientAccountBalanceException;

  TransactionType getType();
}
