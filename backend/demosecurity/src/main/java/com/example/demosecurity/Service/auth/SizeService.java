package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.CategoryConvert;
import com.example.demosecurity.Convert.SizeConvert;
import com.example.demosecurity.Repository.CategoryRep;
import com.example.demosecurity.Repository.SizeRepo;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.SizeDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Size;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SizeService {
    @Autowired
    private SizeRepo sizeRepo;
    @Autowired
    private SizeConvert sizeConvert;
    private static final Logger logger = LogManager.getLogger(SizeService.class);

    public SizeDTO save(SizeDTO sizeDTO) {
        Size size = sizeConvert.toEntity(sizeDTO);
        sizeRepo.save(size);
        return sizeConvert.toDTO(size);
    }

    public SizeDTO update(SizeDTO sizeDTO) {
        Size newsSize ;
        Size oldsSize = sizeRepo.findSizeById(sizeDTO.getId());
        newsSize = sizeConvert.toEntity(sizeDTO,oldsSize);
        sizeRepo.save(newsSize);
        return sizeConvert.toDTO(newsSize);
    }

    public void delete(Long id) {
        try {
            Optional<Size> category = sizeRepo.findById(id);
            if(category!=null){
                sizeRepo.deleteById(id);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<SizeDTO> findAll(Pageable pageable) {
        List<SizeDTO> results = new ArrayList<>();
        try {
            List<Size> entities = sizeRepo.findAll(pageable).getContent();
            for (Size item: entities) {
                SizeDTO sizeDTO = sizeConvert.toDTO(item);
                results.add(sizeDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) sizeRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<SizeDTO> findAll() {
        List<SizeDTO> results = new ArrayList<>();
        List<Size> entities = sizeRepo.findAll();
        for (Size item: entities) {
            SizeDTO newDTO = sizeConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
