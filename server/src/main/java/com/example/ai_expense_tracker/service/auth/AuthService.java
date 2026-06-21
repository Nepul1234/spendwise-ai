package com.example.ai_expense_tracker.service.auth;

import com.example.ai_expense_tracker.dto.AuthResponse;
import com.example.ai_expense_tracker.dto.LoginRequest;

public interface AuthService {
  AuthResponse login(LoginRequest request);
}
