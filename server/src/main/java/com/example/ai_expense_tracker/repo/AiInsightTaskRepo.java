package com.example.ai_expense_tracker.repo;

import com.example.ai_expense_tracker.model.AiInsightTask;
import com.example.ai_expense_tracker.model.InsightType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AiInsightTaskRepo extends JpaRepository<AiInsightTask, Long> {
  List<AiInsightTask> findAllByAppUserIdOrderByCreatedAtDesc(String appUserId);
  List<AiInsightTask> findAllByAppUserIdAndTypeOrderByCreatedAtDesc(String appUserId, InsightType type);
  Optional<AiInsightTask> findTopByAppUserIdAndTypeOrderByCreatedAtDesc(String appUserId, InsightType type);
}
