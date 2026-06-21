package com.example.ai_expense_tracker.repo;


import com.example.ai_expense_tracker.model.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AccountRepo extends CrudRepository<Account, Long> {
    @Query("SELECT a FROM Account a LEFT JOIN FETCH a.bank WHERE a.appUser.id = :appUserId")
    List<Account> findAllByAppUserId(String appUserId);

    @Query("SELECT COUNT(*) = :accountListCount " +
            "FROM Account a " +
            "JOIN a.appUser u " +
            "WHERE u.id = :appUserId " +
            "AND a.id IN :accounts")
    boolean existsByAppUserIdAndAccountId(String appUserId, List<Long> accounts, int accountListCount);
}
