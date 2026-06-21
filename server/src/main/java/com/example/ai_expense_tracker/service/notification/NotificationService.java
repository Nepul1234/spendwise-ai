package com.example.ai_expense_tracker.service.notification;

import com.example.ai_expense_tracker.dto.JobStatusDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
  void send(JobStatusDto jobStatus);

  void openConnection(String string);

  SseEmitter get(String jobId);

  void closeConnection(String jobId);
}
