package com.example.ai_expense_tracker.service.account.strategy;

import com.example.ai_expense_tracker.exception.InsufficientAccountBalanceException;
import com.example.ai_expense_tracker.model.Account;
import com.example.ai_expense_tracker.model.TransactionType;
import com.example.ai_expense_tracker.service.transaction.TransactionBehavior;

public interface AccountBalanceStrategy {
  Double calculateBalance(Account account, Double amount, TransactionType transactionType, boolean isSourceAccount) throws InsufficientAccountBalanceException;

  Double reverseBalance(Account account, Double previousAmount, TransactionType transactionType, boolean isSourceAccount);

  void validate(Account account, Double amount) throws InsufficientAccountBalanceException;

  TransactionBehavior getType();
}
