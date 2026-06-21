package com.example.ai_expense_tracker.repo;

import com.example.ai_expense_tracker.model.Account;
import com.example.ai_expense_tracker.model.AppUser;
import com.example.ai_expense_tracker.model.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
class CategoryRepoTest {
    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private AppUserRepo appUserRepo;

    @Test
    void shouldReturnTrue_whenUserAndCategoryMatch() {
        final var appUser = AppUser.builder()
                .build();

        final var savedAppUser = appUserRepo.save(appUser);

        final var category = Category.builder()
                .appUser(savedAppUser)
                .build();

        final var savedCategory = categoryRepo.save(category);

        final var appUserId = savedAppUser.getId();
        final var categoryId = savedCategory.getId();

        assertTrue(categoryRepo.existsByAppUserIdAndCategoryId(appUserId, categoryId));
    }

    @Test
    void shouldReturnTrue_whenCategoryMatch() {
        final var category = Category.builder()
                .build();

        final var savedCategory = categoryRepo.save(category);

        final var categoryId = savedCategory.getId();

        assertTrue(categoryRepo.existsById(categoryId));
    }

    @Test
    void shouldReturnFalse_whenUserAndCategoryNotMatch() {
        final var appUser = AppUser.builder()
                .build();

        final var savedAppUser = appUserRepo.save(appUser);

        final var category = Category.builder()
                .appUser(savedAppUser)
                .build();

        final var savedCategory = categoryRepo.save(category);

        final var appUserId = UUID.randomUUID().toString();
        final var categoryId = savedCategory.getId();

        assertFalse(categoryRepo.existsByAppUserIdAndCategoryId(appUserId, categoryId));
    }
}