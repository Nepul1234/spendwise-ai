package com.example.ai_expense_tracker.repo;


import com.example.ai_expense_tracker.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepo extends JpaRepository<AppUser, Long> {
  boolean existsByEmail(String email);

  Optional<AppUser> findByEmail(String email);
}
