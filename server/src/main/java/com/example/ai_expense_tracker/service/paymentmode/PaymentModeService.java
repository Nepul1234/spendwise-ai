package com.example.ai_expense_tracker.service.paymentmode;

import com.example.ai_expense_tracker.model.PaymentMode;

import java.util.List;

public interface PaymentModeService {
    boolean existsById(Long paymentModeId);

  PaymentMode get(Long paymentModeId);

  List<PaymentMode> listAll();
}
