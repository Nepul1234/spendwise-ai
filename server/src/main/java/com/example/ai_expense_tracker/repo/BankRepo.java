package com.example.ai_expense_tracker.repo;



import com.example.ai_expense_tracker.model.Bank;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface BankRepo extends CrudRepository<Bank, Long> {
    Optional<Bank> findByName(String stateBankOfIndia);
}
