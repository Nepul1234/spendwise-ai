package com.example.ai_expense_tracker.service.account;

import com.example.ai_expense_tracker.dto.AccountDto;
import com.example.ai_expense_tracker.exception.AccountNotFoundException;
import com.example.ai_expense_tracker.exception.InsufficientAccountBalanceException;
import com.example.ai_expense_tracker.model.Account;
import com.example.ai_expense_tracker.model.TransactionType;
import com.example.ai_expense_tracker.repo.AccountRepo;
import com.example.ai_expense_tracker.service.paymentmode.PaymentModeService;
import com.example.ai_expense_tracker.service.account.strategy.AccountBalanceStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
  private final AccountRepo accountRepo;
  private final PaymentModeService paymentModeService;
  private final AccountBalanceStrategyFactory accountBalanceStrategyFactory;

  @Override
  public boolean existsByUserAndAccount(String appUserId, List<Long> accounts) {
    return accountRepo.existsByAppUserIdAndAccountId(appUserId, accounts, accounts.size());
  }

  @Transactional
  @Override
  public void updateBalance(Long accountId, Double amount, Long paymentModeId, String type, boolean isSourceAccount) throws InsufficientAccountBalanceException {

    final var paymentMode = paymentModeService.get(paymentModeId);

    final var accountBalanceStrategy = accountBalanceStrategyFactory.getBalanceStrategy(paymentMode.getType());

    final var account = this.get(accountId);

    final var updatedBalance = accountBalanceStrategy.calculateBalance(account, amount, TransactionType.valueOf(type), isSourceAccount);

    account.setBalance(updatedBalance);

    this.update(account);
  }

  @Override
  public Account get(Long accountId) {
    return accountRepo.findById(accountId)
        .orElseThrow(() -> new AccountNotFoundException(accountId));
  }

  @Override
  public void update(Account account) {
    accountRepo.save(account);
  }

  @Override
  public void reverseBalance(Long accountId, Double amount, Long paymentModeId, String type, boolean isSourceAccount) {
    final var paymentMode = paymentModeService.get(paymentModeId);

    final var accountBalanceStrategy = accountBalanceStrategyFactory.getBalanceStrategy(paymentMode.getType());

    final var account = this.get(accountId);

    final var updatedBalance = accountBalanceStrategy.reverseBalance(account, amount, TransactionType.valueOf(type), isSourceAccount);

    account.setBalance(updatedBalance);

    this.update(account);
  }

  @Override
  public List<AccountDto> listAccounts(String appUserId) {
    return accountRepo.findAllByAppUserId(appUserId).stream()
        .map(a -> {
          String name;
          if (a.getBank() != null) {
            String last4 = a.getLastFourDigits() != null && !a.getLastFourDigits().isEmpty()
                ? " ·· " + a.getLastFourDigits() : "";
            name = a.getBank().getName() + last4;
          } else {
            name = a.getLastFourDigits() != null && !a.getLastFourDigits().isEmpty()
                ? a.getLastFourDigits() : "Account";
          }
          return new AccountDto(a.getId(), name, a.getBalance(), a.getLastFourDigits());
        })
        .toList();
  }
}
