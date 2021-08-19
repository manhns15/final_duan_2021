package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.ColorConvert;
import com.example.demosecurity.Repository.ColorRepo;
import com.example.demosecurity.model.dto.ColorDTO;
import com.example.demosecurity.model.entity.Color;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ColorService {
    @Autowired
    private ColorRepo colorRepo;
    @Autowired
    private ColorConvert colorConvert;
    private static final Logger logger = LogManager.getLogger(ColorService.class);

    public ColorDTO save(ColorDTO colorDTO) {
        Color color = colorConvert.toEntity(colorDTO);
        colorRepo.save(color);
        return colorConvert.toDTO(color);
    }

    public ColorDTO update(ColorDTO colorDTO) {
        Color newscColor ;
        Color oldscColor = colorRepo.findColorById(colorDTO.getId());
        newscColor = colorConvert.toEntity(colorDTO,oldscColor);
        colorRepo.save(newscColor);
        return colorConvert.toDTO(newscColor);
    }

    public void delete(Long id) {
        try {
            Optional<Color> category = colorRepo.findById(id);
            if(category!=null){
                colorRepo.deleteById(id);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<ColorDTO> findAll(Pageable pageable) {
        List<ColorDTO> results = new ArrayList<>();
        try {
            List<Color> entities = colorRepo.findAll(pageable).getContent();
            for (Color item: entities) {
                ColorDTO colorDTO = colorConvert.toDTO(item);
                results.add(colorDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) colorRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<ColorDTO> findAll() {
        List<ColorDTO> results = new ArrayList<>();
        List<Color> entities = colorRepo.findAll();
        for (Color item: entities) {
            ColorDTO newDTO = colorConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
