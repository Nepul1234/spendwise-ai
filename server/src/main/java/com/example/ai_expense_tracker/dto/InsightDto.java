package com.example.ai_expense_tracker.dto;

import com.example.ai_expense_tracker.model.InsightType;

public record InsightDto(
    Long id,
    InsightType type,
    String insightText,
    String status,
    Long createdAt
) {}
