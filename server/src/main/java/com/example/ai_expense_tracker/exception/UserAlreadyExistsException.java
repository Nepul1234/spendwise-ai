package com.example.ai_expense_tracker.exception;

public class UserAlreadyExistsException extends RuntimeException {
  public UserAlreadyExistsException(String s) {
    super(s);
  }
}
