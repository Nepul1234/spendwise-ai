package com.example.ai_expense_tracker.service.transaction.strategy;

import com.example.ai_expense_tracker.dto.TransactionDto;
import com.example.ai_expense_tracker.dto.TransactionRequestDto;
import com.example.ai_expense_tracker.exception.InsufficientAccountBalanceException;
import com.example.ai_expense_tracker.exception.TransactionNotFoundException;
import com.example.ai_expense_tracker.mapper.TransactionMapper;
import com.example.ai_expense_tracker.model.Transaction;
import com.example.ai_expense_tracker.model.TransactionType;
import com.example.ai_expense_tracker.repo.TransactionRepo;
import com.example.ai_expense_tracker.service.account.AccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("ExpenseIncomeStrategy")
@RequiredArgsConstructor
public class ExpenseIncomeStrategy implements TransactionTypeStrategy{
  private final AccountService accountService;
  private final TransactionMapper transactionMapper;
  private final TransactionRepo transactionRepo;

  @Transactional
  @Override
  public TransactionDto process(String appUserId, TransactionRequestDto dto, OperationType type) throws InsufficientAccountBalanceException {

    Transaction transaction;

    if(type == OperationType.UPDATE){
      transaction = transactionRepo.findById(dto.transactionId())
          .orElseThrow(() -> new TransactionNotFoundException(dto.transactionId()));

      accountService.reverseBalance(dto.accountId(), Math.abs(transaction.getAmount()), dto.paymentModeId(), dto.type(), false);

    }else{
      transaction = new Transaction();
    }

    accountService.updateBalance(dto.accountId(), dto.amount(), dto.paymentModeId(), dto.type(), false);

    transactionMapper.transactionFromRequestDto(dto, transaction, appUserId, null, false);

    final var savedTransaction = transactionRepo.save(transaction);

    return transactionMapper.transactionDtoToTransactionDto(savedTransaction);
  }

  @Override
  public TransactionType getType() {
    return TransactionType.INCOME;
  }
}
