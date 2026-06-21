package com.example.ai_expense_tracker;

import com.example.ai_expense_tracker.model.Account;
import com.example.ai_expense_tracker.model.AppUser;
import com.example.ai_expense_tracker.repo.AccountRepo;
import com.example.ai_expense_tracker.repo.AppUserRepo;
import com.example.ai_expense_tracker.repo.BankRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class CmdRunner implements CommandLineRunner {
  private final BankRepo bankRepo;
  private final AccountRepo accountRepo;
  private final AppUserRepo appUserRepo;

  @Override
  public void run(String... args) throws Exception {
//    final var dto = new CreateTransactionDto(
//        "EXPENSE",
//        "200 rs petrol",
//        200.0,
//        "10-04-2026",
//        1L,
//        1L,
//        1L
//    );
//
//    System.out.println(mapper.writeValueAsString(dto));

    if (appUserRepo.findAll().isEmpty()) {
      final var bank = bankRepo.findByName("State Bank of India")
          .orElseThrow();

      final var appUser = AppUser.builder()
          .name("Akshay")
          .email("akshay@codingstreams.in")
          .password("password")
          .build();

      final var savedUser = appUserRepo.save(appUser);

      log.info("user created: {}", savedUser.getId());

      final var account = Account.builder()
          .bank(bank)
          .appUser(AppUser.ofId(savedUser.getId()))
          .balance(2500.00)
          .lastFourDigits("0988")
          .build();

      accountRepo.save(account);


    }

  }
}
