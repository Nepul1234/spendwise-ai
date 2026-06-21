package com.example.ai_expense_tracker.repo;

import com.example.ai_expense_tracker.model.Transaction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransactionRepo extends CrudRepository<Transaction, Long> {
  @Query("SELECT DISTINCT t FROM Transaction t " +
      "LEFT JOIN FETCH t.category " +
      "LEFT JOIN FETCH t.account a " +
      "LEFT JOIN FETCH a.bank " +
      "LEFT JOIN FETCH t.paymentMode " +
      "WHERE t.appUser.id = :appUserId " +
      "ORDER BY t.createdAt DESC")
  List<Transaction> findAllByAppUser(String appUserId);

  @Modifying
  @Transactional
  @Query("DELETE " +
      "FROM Transaction t " +
      "WHERE t.appUser.id = :appUserId " +
      "AND t.id = :transactionId")
  void deleteByIdAndAppUserId(Long transactionId, String appUserId);

  List<Transaction> findAllByTransferId(String transferId);

  @Query("SELECT t FROM Transaction t WHERE t.appUser.id = :appUserId AND t.createdAt >= :from AND t.createdAt <= :to")
  List<Transaction> findAllByAppUserIdAndCreatedAtBetween(String appUserId, Long from, Long to);
}
