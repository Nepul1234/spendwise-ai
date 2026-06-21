package com.example.ai_expense_tracker.service.appuser;

import com.example.ai_expense_tracker.dto.RegisterRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AppUserService extends UserDetailsService {
  void registerUser(RegisterRequest request);
}
