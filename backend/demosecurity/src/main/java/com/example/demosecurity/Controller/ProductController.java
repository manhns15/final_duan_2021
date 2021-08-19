package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.ProductService;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.ProductDTO;
import com.example.demosecurity.model.entity.Category;
import com.example.demosecurity.model.entity.Product;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("v1/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDTO> getAll() {
        return productService.findAll();
    }

    @GetMapping("/products/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ProductDTO getProductById(@PathVariable(value ="id") long id)
    {
        return productService.findProductById(id);
    }

    @GetMapping("/products/categorys/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDTO> getProductByCategory(@PathVariable(value ="id") long id) {
        return productService.getProductByCategory(id);
    }

    @GetMapping("/products/byName/{name}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDTO> getProductByName(@PathVariable(value ="name") String name) {
        return productService.getProductByName(name);
    }

    @PostMapping("/product")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        return productService.save(productDTO);
    }

    @PutMapping(value = "/product/{id}")
    public ProductDTO updateNew(@RequestBody ProductDTO productDTO, @PathVariable("id") long id) {
        productDTO.setId(id);
        return productService.update(productDTO);
    }

    @DeleteMapping(value = "/product/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        productService.delete(id);
    }
}
