package com.example.ai_expense_tracker.controller;

import com.example.ai_expense_tracker.dto.InsightDto;
import com.example.ai_expense_tracker.model.InsightType;
import com.example.ai_expense_tracker.service.insight.AiInsightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
public class InsightController {
  private final AiInsightService aiInsightService;

  @GetMapping
  public ResponseEntity<List<InsightDto>> getInsights(
      @RequestParam(required = false) InsightType type,
      @AuthenticationPrincipal String userId) {

    final var insights = aiInsightService.getInsights(userId, type);
    return ResponseEntity.ok(insights);
  }

  @GetMapping("/latest")
  public ResponseEntity<InsightDto> getLatestInsight(
      @RequestParam InsightType type,
      @AuthenticationPrincipal String userId) {

    return aiInsightService.getLatestInsight(userId, type)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.noContent().build());
  }
}
