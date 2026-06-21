package com.example.ai_expense_tracker.service.ai.parsetask;

import com.example.ai_expense_tracker.model.AiParsingTask;
import com.example.ai_expense_tracker.model.Status;

import java.util.List;

public interface AiParseTaskService {
  AiParsingTask save(AiParsingTask aiParsingTask);

  List<AiParsingTask> getPendingTasks(Status status);

  AiParsingTask getByIdWithAppUser(Long aLong);
}
