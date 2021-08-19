package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.CategoryConvert;
import com.example.demosecurity.Repository.CategoryRep;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.entity.Category;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
@Autowired
private CategoryRep categoryRep;
@Autowired
private CategoryConvert categoryConvert;
    private static final Logger logger = LogManager.getLogger(CategoryService.class);

    public CategoryDTO save(CategoryDTO categoryDTO) {
        Category category = categoryConvert.toEntity(categoryDTO);
        categoryRep.save(category);
        return categoryConvert.toDTO(category);
    }

    public CategoryDTO update(CategoryDTO categoryDTO) {
        Category newcategory ;
        Category oldcategory = categoryRep.findCategoryById(categoryDTO.getId());
        newcategory = categoryConvert.toEntity(categoryDTO,oldcategory);
        categoryRep.save(newcategory);
        return categoryConvert.toDTO(newcategory);

    }

    public void delete(Long id) {
        try {
            Optional<Category> category = categoryRep.findById(id);
            if(category!=null){
                categoryRep.deleteById(id);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<CategoryDTO> findAll(Pageable pageable) {
        List<CategoryDTO> results = new ArrayList<>();
        try {
            List<Category> entities = categoryRep.findAll(pageable).getContent();
            for (Category item: entities) {
                CategoryDTO categoryDTO = categoryConvert.toDTO(item);
                results.add(categoryDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) categoryRep.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
         return 1;
    }

    public List<CategoryDTO> findAll() {
        List<CategoryDTO> results = new ArrayList<>();
        List<Category> entities = categoryRep.findAll();
        for (Category item: entities) {
            CategoryDTO newDTO = categoryConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
