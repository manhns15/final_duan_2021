package com.example.demosecurity.Convert;

import com.example.demosecurity.model.dto.ColorDTO;
import com.example.demosecurity.model.entity.Color;
import org.springframework.stereotype.Component;

@Component
public class ColorConvert {
        public Color toEntity(ColorDTO dto) {
            Color entity = new Color();
        entity.setNamecolor(dto.getNamecolor());
        entity.setStatus(dto.getStatus());
        return entity;
    }

    public ColorDTO toDTO(Color entity) {
        ColorDTO dto = new ColorDTO();
        dto.setId(entity.getId());
        dto.setNamecolor(entity.getNamecolor());
        dto.setStatus(entity.getStatus());
        dto.setCreatedate(entity.getCreatedate());
        dto.setCreateby(entity.getCreateby());
        return dto;
    }

    public Color toEntity(ColorDTO dto, Color entity) {
        entity.setNamecolor(dto.getNamecolor());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
