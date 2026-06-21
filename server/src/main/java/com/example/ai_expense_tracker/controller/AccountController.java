package com.example.ai_expense_tracker.controller;

import com.example.ai_expense_tracker.dto.AccountDto;
import com.example.ai_expense_tracker.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<List<AccountDto>> getAccounts(@AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(accountService.listAccounts(userId));
    }
}
