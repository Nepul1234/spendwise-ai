package com.example.ai_expense_tracker.dto;

import java.time.LocalDateTime;

public record JobStatusDto (String jobId, String status, String timestamp){
  public static JobStatusDto of(String jobId, String status){
    return new JobStatusDto(jobId, status, LocalDateTime.now().toString());
  }
}
