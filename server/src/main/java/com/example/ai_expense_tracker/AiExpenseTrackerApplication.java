package com.example.ai_expense_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableAsync
public class AiExpenseTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiExpenseTrackerApplication.class, args);
	}

}
