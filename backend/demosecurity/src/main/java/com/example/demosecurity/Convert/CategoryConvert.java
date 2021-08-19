package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.entity.Category;
import org.springframework.stereotype.Component;


@Component
public class CategoryConvert {
    public Category toEntity(CategoryDTO dto) {
        Category entity = new Category();
        entity.setName(dto.getName());
        entity.setDecription(dto.getDecription());
        entity.setStatus(dto.isStatus());
        return entity;
    }

    public CategoryDTO toDTO(Category entity) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDecription(entity.getDecription());
        dto.setStatus(entity.isStatus());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public Category toEntity(CategoryDTO dto, Category entity) {
        entity.setName(dto.getName());
        entity.setDecription(dto.getDecription());
        entity.setStatus(dto.isStatus());
        return entity;
    }

}
