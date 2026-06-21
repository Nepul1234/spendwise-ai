package com.example.ai_expense_tracker.controller;

import com.example.ai_expense_tracker.dto.PaymentModeDto;
import com.example.ai_expense_tracker.service.paymentmode.PaymentModeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payment-modes")
@RequiredArgsConstructor
public class PaymentModeController {
    private final PaymentModeService paymentModeService;

    @GetMapping
    public ResponseEntity<List<PaymentModeDto>> getPaymentModes() {
        return ResponseEntity.ok(
            paymentModeService.listAll().stream()
                .map(p -> new PaymentModeDto(p.getId(), p.getName(),
                    p.getType() != null ? p.getType().name() : null))
                .toList()
        );
    }
}
