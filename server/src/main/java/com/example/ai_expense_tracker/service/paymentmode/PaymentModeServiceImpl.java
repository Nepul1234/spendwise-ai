package com.example.ai_expense_tracker.service.paymentmode;

import com.example.ai_expense_tracker.exception.PaymentModeNotFoundException;
import com.example.ai_expense_tracker.model.PaymentMode;
import com.example.ai_expense_tracker.repo.PaymentModeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentModeServiceImpl implements PaymentModeService {
    private final PaymentModeRepo paymentModeRepo;

    @Override
    public boolean existsById(Long paymentModeId) {
        return paymentModeRepo.existsById(paymentModeId);
    }

    @Override
    public PaymentMode get(Long paymentModeId) {
        return paymentModeRepo.findById(paymentModeId)
            .orElseThrow(()->new PaymentModeNotFoundException(paymentModeId));
    }

    @Override
    public List<PaymentMode> listAll() {
        List<PaymentMode> result = new ArrayList<>();
        paymentModeRepo.findAll().forEach(result::add);
        return result;
    }
}
