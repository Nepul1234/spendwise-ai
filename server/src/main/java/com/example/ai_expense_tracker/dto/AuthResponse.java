package com.example.ai_expense_tracker.dto;

public record AuthResponse(String accessToken, String tokenType, long expiresInSeconds) {
}
