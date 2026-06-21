package com.example.ai_expense_tracker.repo;

import com.example.ai_expense_tracker.model.AiParsingTask;
import com.example.ai_expense_tracker.model.Status;

import org.hibernate.query.spi.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AiParsingTaskRepo extends JpaRepository<AiParsingTask, Long> {
  List<AiParsingTask> findAllByStatusOrderByCreatedAtAsc(Status status, Limit limit);

  @Query("SELECT apt " +
      "FROM AiParsingTask apt " +
      "JOIN FETCH apt.appUser u " +
      "WHERE apt.id = :jobId")
  Optional<AiParsingTask> findByIdWithAppUser(Long jobId);
}
