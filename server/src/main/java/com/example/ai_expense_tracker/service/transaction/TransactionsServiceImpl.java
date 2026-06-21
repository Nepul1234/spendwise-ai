package com.example.ai_expense_tracker.service.transaction;

import com.example.ai_expense_tracker.dto.TransactionDto;
import com.example.ai_expense_tracker.dto.TransactionRequestDto;
import com.example.ai_expense_tracker.exception.*;
import com.example.ai_expense_tracker.mapper.TransactionMapper;
import com.example.ai_expense_tracker.model.*;
import com.example.ai_expense_tracker.repo.TransactionRepo;
import com.example.ai_expense_tracker.service.account.AccountService;
import com.example.ai_expense_tracker.service.appuser.AppUserService;
import com.example.ai_expense_tracker.service.category.CategoryService;
import com.example.ai_expense_tracker.service.paymentmode.PaymentModeService;
import com.example.ai_expense_tracker.service.transaction.strategy.OperationType;
import com.example.ai_expense_tracker.service.transaction.strategy.TransactionTypeStrategy;
import com.example.ai_expense_tracker.service.transaction.strategy.TxnTypeStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionsServiceImpl implements TransactionsService {
  private final AppUserService appUserService;
  private final AccountService accountService;
  private final CategoryService categoryService;
  private final PaymentModeService paymentModeService;
  private final TransactionRepo transactionRepo;
  private final TransactionMapper transactionMapper;
  private final TxnTypeStrategyFactory txnTypeStrategyFactory;

  @Transactional
  @Override
  public TransactionDto saveTransaction(String appUserId, TransactionRequestDto requestBody) throws InsufficientAccountBalanceException {

    getAndValidateAccounts(requestBody, appUserId);

    final var transactionType = TransactionType.valueOf(requestBody.type()) == TransactionType.TRANSFER? TransactionType.TRANSFER: TransactionType.INCOME;

    final var strategy = txnTypeStrategyFactory.getStrategy(transactionType);

    return strategy.process(appUserId, requestBody, OperationType.CREATE);
  }

  private void getAndValidateAccounts(TransactionRequestDto dto, String appUserId) {
    final var accountId = dto.accountId();
    final var categoryId = dto.categoryId();
    final var paymentModeId = dto.paymentModeId();
    final var toAccountId = dto.toAccountId();
    final var type = dto.type();

    final var accounts = getAccounts(accountId, toAccountId, type);

    validateAccountCategoryAndPaymentMode(appUserId, accounts, categoryId, paymentModeId);
  }

  private static List<Long> getAccounts(Long accountId, Long toAccountId, String type) {
    List<Long> accounts = new ArrayList<>();
    accounts.add(accountId);

    if (TransactionType.valueOf(type) == TransactionType.TRANSFER) {
      accounts.add(toAccountId);
    }
    return accounts;
  }

  private void validateAccountCategoryAndPaymentMode(String appUserId, List<Long> accounts, Long categoryId, Long paymentModeId) {
    final var accountExists = accountService.existsByUserAndAccount(appUserId, accounts);

    if (!accountExists) {
      throw new AccountNotOwnedByUserException(accounts, appUserId);
    }

    final var categoryExists = categoryService.existsByUserAndCategory(appUserId, categoryId);

    if (!categoryExists) {
      throw new CategoryNotFoundException(categoryId);
    }

    final var paymentModeExists = paymentModeService.existsById(paymentModeId);

    if (!paymentModeExists) {
      throw new PaymentModeNotFoundException(categoryId);
    }
  }

  @Override
  public List<TransactionDto> getAllTransactions(String appUserId) {
    final var transactions = transactionRepo.findAllByAppUser(appUserId);
    return transactionMapper.transactionDtosToTransactionDtos(transactions);
  }

  @Override
  public TransactionDto updateTransaction(String appUserId, TransactionRequestDto requestBody) throws InsufficientAccountBalanceException {
    getAndValidateAccounts(requestBody, appUserId);

    final var transactionType = TransactionType.valueOf(requestBody.type()) == TransactionType.TRANSFER? TransactionType.TRANSFER: TransactionType.INCOME;

    final var strategy = txnTypeStrategyFactory.getStrategy(transactionType);

    return strategy.process(appUserId, requestBody, OperationType.UPDATE);
  }

  @Override
  public void deleteTransaction(String appUserId, Long transactionId) {
    transactionRepo.deleteByIdAndAppUserId(transactionId, appUserId);
  }
}
