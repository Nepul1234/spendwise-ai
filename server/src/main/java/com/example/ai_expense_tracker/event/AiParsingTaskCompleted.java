package com.example.ai_expense_tracker.event;

import com.example.ai_expense_tracker.model.AiParsingTask;

public record AiParsingTaskCompleted(
    Long jobId,
    AiParsingTask task
) {
}
