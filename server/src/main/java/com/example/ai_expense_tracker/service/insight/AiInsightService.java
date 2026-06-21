package com.example.ai_expense_tracker.service.insight;

import com.example.ai_expense_tracker.dto.InsightDto;
import com.example.ai_expense_tracker.model.InsightType;

import java.util.List;
import java.util.Optional;

public interface AiInsightService {
  void generateInsightsForAllUsers(InsightType type);
  List<InsightDto> getInsights(String appUserId, InsightType type);
  Optional<InsightDto> getLatestInsight(String appUserId, InsightType type);
}
