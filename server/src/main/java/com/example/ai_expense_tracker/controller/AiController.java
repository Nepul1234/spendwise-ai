package com.example.ai_expense_tracker.controller;

import com.example.ai_expense_tracker.dto.AiInputDto;
import com.example.ai_expense_tracker.dto.AiTaskDto;
import com.example.ai_expense_tracker.dto.TransactionRequestDto;
import com.example.ai_expense_tracker.service.ai.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai-input")
@RequiredArgsConstructor
public class AiController {

  private final AiService aiService;

  @PostMapping
  public ResponseEntity<AiTaskDto> parseRawText(@RequestBody AiInputDto requestBody,
                                                 @AuthenticationPrincipal String userId) {
    final var response = aiService.save(userId, requestBody);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/sync")
  public ResponseEntity<TransactionRequestDto> parseRawTextSync(@RequestBody AiInputDto requestBody) {
    final var response = aiService.parse(requestBody);
    return ResponseEntity.ok(response);
  }
}
