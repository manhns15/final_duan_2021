package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.CategoryService;
import com.example.demosecurity.model.dto.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("v1/api")

public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categorys")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<CategoryDTO> getAll() {
        return categoryService.findAll();
    }

    @PostMapping("/category")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDto) {
        return categoryService.save(categoryDto);
    }

    @PutMapping(value = "/category/{id}")
    public CategoryDTO updateNew(@RequestBody CategoryDTO categoryDto, @PathVariable("id") long id) {
        categoryDto.setId(id);
        return categoryService.update(categoryDto);
    }

    @DeleteMapping(value = "/category/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        categoryService.delete(id);
    }
}
