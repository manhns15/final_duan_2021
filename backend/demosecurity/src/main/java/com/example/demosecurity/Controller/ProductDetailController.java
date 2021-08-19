package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.ProductDetailService;
import com.example.demosecurity.model.dto.CategoryDTO;
import com.example.demosecurity.model.dto.ProductDetailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("v1/api")
public class ProductDetailController {
    @Autowired
    private ProductDetailService productDetailService;
    @GetMapping("/productdetails")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDetailDTO> getAll() {
        return productDetailService.findAll();
    }

    @GetMapping("/productdetails/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<ProductDetailDTO> getAllProduct(@PathVariable(name = "id") long id) {
        return productDetailService.findAllIdProduct(id);
    }

    @GetMapping("/productdetails/sku/{sku}")
    @ResponseStatus(HttpStatus.CREATED)
    public  ProductDetailDTO getAllProduct(@PathVariable(name = "sku") String sku) {
        return productDetailService.findBySku(sku);
    }

    @PostMapping("/productdetail")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ProductDetailDTO createCategory(@RequestBody ProductDetailDTO productDetailDTO) {
        return productDetailService.save(productDetailDTO);
    }

    @PutMapping(value = "/productdetail/{id}")
    public ProductDetailDTO updateNew(@RequestBody ProductDetailDTO productDetailDTO, @PathVariable("id") long id) {
        productDetailDTO.setId(id);
        return productDetailService.update(productDetailDTO);
    }

    @DeleteMapping(value = "/productdetail/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        productDetailService.delete(id);
    }
}
