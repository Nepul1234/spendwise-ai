package com.example.ai_expense_tracker.service.insight;

import com.example.ai_expense_tracker.dto.InsightDto;
import com.example.ai_expense_tracker.model.AiInsightTask;
import com.example.ai_expense_tracker.model.AppUser;
import com.example.ai_expense_tracker.model.InsightType;
import com.example.ai_expense_tracker.model.Status;
import com.example.ai_expense_tracker.model.Transaction;
import com.example.ai_expense_tracker.repo.AiInsightTaskRepo;
import com.example.ai_expense_tracker.repo.AppUserRepo;
import com.example.ai_expense_tracker.repo.TransactionRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiInsightServiceImpl implements AiInsightService {

  private static final String INSIGHT_PROMPT = """
      You are a personal finance advisor. Analyze the following {period} transactions and provide concise spending insights.

      Transactions:
      {transactions}

      Provide:
      1. Total income and total expenses for the period
      2. Top spending categories
      3. Notable patterns or anomalies
      4. 2-3 actionable tips to improve financial health

      Keep the response concise and practical. Use plain text only.
      """;

  private final AiInsightTaskRepo aiInsightTaskRepo;
  private final AppUserRepo appUserRepo;
  private final TransactionRepo transactionRepo;
  private final ChatClient chatClient;

  @Override
  public void generateInsightsForAllUsers(InsightType type) {
    final var users = appUserRepo.findAll();
    final var lookbackDays = type == InsightType.WEEKLY ? 7L : 30L;
    final var now = Instant.now();
    final var from = now.minus(lookbackDays, ChronoUnit.DAYS).toEpochMilli();
    final var to = now.toEpochMilli();

    for (AppUser user : users) {
      try {
        generateInsightForUser(user, type, from, to);
      } catch (Exception e) {
        log.error("Failed to generate {} insight for user {}: {}", type, user.getId(), e.getMessage());
      }
    }
  }

  @Override
  public List<InsightDto> getInsights(String appUserId, InsightType type) {
    final var tasks = type != null
        ? aiInsightTaskRepo.findAllByAppUserIdAndTypeOrderByCreatedAtDesc(appUserId, type)
        : aiInsightTaskRepo.findAllByAppUserIdOrderByCreatedAtDesc(appUserId);

    return tasks.stream().map(this::toDto).collect(Collectors.toList());
  }

  @Override
  public Optional<InsightDto> getLatestInsight(String appUserId, InsightType type) {
    return aiInsightTaskRepo
        .findTopByAppUserIdAndTypeOrderByCreatedAtDesc(appUserId, type)
        .map(this::toDto);
  }

  private void generateInsightForUser(AppUser user, InsightType type, Long from, Long to) {
    final var transactions = transactionRepo.findAllByAppUserIdAndCreatedAtBetween(user.getId(), from, to);

    if (transactions.isEmpty()) {
      log.info("No transactions found for user {} in the {} period — skipping insight generation", user.getId(), type);
      return;
    }

    final var formattedTransactions = formatTransactions(transactions);
    final var period = type == InsightType.WEEKLY ? "weekly" : "monthly";

    final var prompt = INSIGHT_PROMPT
        .replace("{period}", period)
        .replace("{transactions}", formattedTransactions);

    final var insightText = chatClient.prompt(prompt)
        .call()
        .content();

    final var task = AiInsightTask.builder()
        .appUser(AppUser.ofId(user.getId()))
        .type(type)
        .insightText(insightText)
        .status(Status.COMPLETED)
        .createdAt(System.currentTimeMillis())
        .build();

    aiInsightTaskRepo.save(task);

    log.info("Generated {} insight for user {}", type, user.getId());
  }

  private String formatTransactions(List<Transaction> transactions) {
    return transactions.stream()
        .map(t -> "Date: %s, Type: %s, Amount: %.2f, Category: %s, Description: %s".formatted(
            t.getTransactionDate(),
            t.getType(),
            Math.abs(t.getAmount()),
            t.getCategory() != null ? t.getCategory().getName() : "N/A",
            t.getDescription() != null ? t.getDescription() : "N/A"
        ))
        .collect(Collectors.joining("\n"));
  }

  private InsightDto toDto(AiInsightTask task) {
    return new InsightDto(
        task.getId(),
        task.getType(),
        task.getInsightText(),
        task.getStatus().name(),
        task.getCreatedAt()
    );
  }
}
