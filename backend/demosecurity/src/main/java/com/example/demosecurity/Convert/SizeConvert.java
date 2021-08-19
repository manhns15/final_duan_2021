package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.SizeDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Size;
import org.springframework.stereotype.Component;

@Component
public class SizeConvert {
    public Size toEntity(SizeDTO dto) {
        Size entity = new Size();
        entity.setNamesize(dto.getNamesize());
        entity.setStatus(dto.isStatus());
        return entity;
    }

    public SizeDTO toDTO(Size entity) {
        SizeDTO dto = new SizeDTO();
        dto.setId(entity.getId());
        dto.setNamesize(entity.getNamesize());
        dto.setStatus(entity.isStatus());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public Size toEntity(SizeDTO dto, Size entity) {
        entity.setNamesize(dto.getNamesize());
        entity.setStatus(dto.isStatus());
        return entity;
    }
}
