package com.example.ai_expense_tracker.mapper;

import com.example.ai_expense_tracker.dto.AiTaskDto;
import com.example.ai_expense_tracker.model.AiParsingTask;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface AiParseTaskMapper {
  AiParseTaskMapper INSTANCE = Mappers.getMapper(AiParseTaskMapper.class);

  @Mapping(source = "message", target = "message")
  AiTaskDto toDto(AiParsingTask aiParsingTask, String message);
}
