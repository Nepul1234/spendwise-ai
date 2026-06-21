package com.example.ai_expense_tracker.service.account;

import com.example.ai_expense_tracker.dto.AccountDto;
import com.example.ai_expense_tracker.exception.InsufficientAccountBalanceException;
import com.example.ai_expense_tracker.model.Account;

import java.util.List;

public interface AccountService {
    boolean existsByUserAndAccount(String appUserId, List<Long> accounts);

  List<AccountDto> listAccounts(String appUserId);

  void updateBalance(Long accountId, Double amount, Long paymentModeId, String type, boolean isSourceAccount) throws InsufficientAccountBalanceException;

  Account get(Long accountId);

  void update(Account account);

  void reverseBalance(Long accountId, Double amount, Long paymentModeId, String type, boolean isSourceAccount);
}
