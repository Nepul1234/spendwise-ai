package com.example.ai_expense_tracker.service.appuser;

import com.example.ai_expense_tracker.dto.RegisterRequest;
import com.example.ai_expense_tracker.exception.UserAlreadyExistsException;
import com.example.ai_expense_tracker.model.Account;
import com.example.ai_expense_tracker.model.AppUser;
import com.example.ai_expense_tracker.repo.AccountRepo;
import com.example.ai_expense_tracker.repo.AppUserRepo;
import com.example.ai_expense_tracker.repo.BankRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppServiceImpl implements AppUserService {
  private final AppUserRepo appUserRepo;
  private final PasswordEncoder passwordEncoder;
  private final AccountRepo accountRepo;
  private final BankRepo bankRepo;

  @Override
  public void registerUser(RegisterRequest request) {
    final var exists = appUserRepo.existsByEmail(request.email());
    if (exists) throw new UserAlreadyExistsException("Email/User: %s already present.".formatted(request.email()));

    var newUser = AppUser.builder()
        .name(request.name())
        .email(request.email())
        .password(passwordEncoder.encode(request.password()))
        .build();
    var saved = appUserRepo.save(newUser);

    // Create two default accounts so the user can start adding transactions immediately
    var bankIter = bankRepo.findAll().iterator();
    var defaultBank = bankIter.hasNext() ? bankIter.next() : null;

    accountRepo.save(Account.builder().appUser(saved).bank(defaultBank).balance(10000.0).lastFourDigits("0000").build());
    accountRepo.save(Account.builder().appUser(saved).bank(null).balance(5000.0).lastFourDigits("Cash").build());
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    final var appUser = appUserRepo.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("Username: %s not found.".formatted(username)));
    return new User(appUser.getId(), appUser.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
  }
}
