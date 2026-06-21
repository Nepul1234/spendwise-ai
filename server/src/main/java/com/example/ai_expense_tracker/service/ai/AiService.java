package com.example.ai_expense_tracker.service.ai;

import com.example.ai_expense_tracker.dto.AiInputDto;
import com.example.ai_expense_tracker.dto.AiTaskDto;
import com.example.ai_expense_tracker.dto.TransactionRequestDto;
import com.example.ai_expense_tracker.model.AiParsingTask;

public interface AiService {
  TransactionRequestDto parse(AiInputDto requestBody);

  void parse(AiParsingTask task);

  AiTaskDto save(String appUserId, AiInputDto requestBody);
}
