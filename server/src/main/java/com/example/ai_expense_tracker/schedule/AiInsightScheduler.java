package com.example.ai_expense_tracker.schedule;

import com.example.ai_expense_tracker.model.InsightType;
import com.example.ai_expense_tracker.service.insight.AiInsightService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AiInsightScheduler {
  private final AiInsightService aiInsightService;

  @Scheduled(cron = "0 0 9 * * MON")
  void generateWeeklyInsights() {
    log.info("Generating weekly insights for all users...");
    aiInsightService.generateInsightsForAllUsers(InsightType.WEEKLY);
  }

  @Scheduled(cron = "0 0 9 1 * *")
  void generateMonthlyInsights() {
    log.info("Generating monthly insights for all users...");
    aiInsightService.generateInsightsForAllUsers(InsightType.MONTHLY);
  }
}
