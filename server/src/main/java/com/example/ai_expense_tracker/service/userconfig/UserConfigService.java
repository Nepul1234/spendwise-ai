package com.example.ai_expense_tracker.service.userconfig;

import com.example.ai_expense_tracker.model.UserConfig;

public interface UserConfigService {
  UserConfig getByUserId(String appUserId);
}
