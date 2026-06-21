package com.example.ai_expense_tracker.repo;


import com.example.ai_expense_tracker.model.Account;
import com.example.ai_expense_tracker.model.PaymentMode;
import org.springframework.data.repository.CrudRepository;

public interface PaymentModeRepo extends CrudRepository<PaymentMode, Long> {
}
