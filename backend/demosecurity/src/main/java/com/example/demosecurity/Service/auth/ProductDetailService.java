package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.ProductDetailConvert;
import com.example.demosecurity.Repository.ColorRepo;
import com.example.demosecurity.Repository.ProductDetailRepo;
import com.example.demosecurity.Repository.ProductRepo;
import com.example.demosecurity.Repository.SizeRepo;
import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductDetailService {
    @Autowired
    private ProductDetailConvert productDetailConvert;
    @Autowired
    private ColorRepo colorRepo;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private SizeRepo sizeRepo;
    @Autowired
    private ProductDetailRepo productDetailRepo;

    private static final Logger logger = LogManager.getLogger(ProductDetailService.class);

    public ProductDetailDTO save(ProductDetailDTO productDetailDTO) {
        ProductDetail productDetail;
        Product product = productRepo.findProductById(productDetailDTO.getIdproduct());
        Color color = colorRepo.findColorById(productDetailDTO.getIdcolor());
        Size size = sizeRepo.findSizeById(productDetailDTO.getIdcolor());
        productDetail = productDetailConvert.toEntity(productDetailDTO);
        productDetail.setProduct(product);
        productDetail.setColor(color);
        productDetail.setSize(size);
        productDetailRepo.save(productDetail);
        return productDetailConvert.toDTO(productDetail);

    }

    public ProductDetailDTO update(ProductDetailDTO productDetailDTO) {
        ProductDetail newproductProductDetail= new ProductDetail() ;
        ProductDetail oldproductProductDetail = productDetailRepo.findProductDetailById(productDetailDTO.getId());
        newproductProductDetail = productDetailConvert.toEntity(productDetailDTO,oldproductProductDetail);
        Product product = productRepo.findProductById(productDetailDTO.getIdproduct());
        Color color = colorRepo.findColorById(productDetailDTO.getIdcolor());
        Size size = sizeRepo.findSizeById(productDetailDTO.getIdcolor());
        newproductProductDetail.setProduct(product);
        newproductProductDetail.setColor(color);
        newproductProductDetail.setSize(size);
        productDetailRepo.save(newproductProductDetail);
        return productDetailConvert.toDTO(newproductProductDetail);

    }

    public void delete(Long id) {
        try {
            Optional<ProductDetail> product = productDetailRepo.findById(id);
            if(product!=null){
                productRepo.deleteById(id);
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
    }


    public List<ProductDetailDTO> findAll(Pageable pageable) {
        List<ProductDetailDTO> results = new ArrayList<>();
        try {
            List<ProductDetail> entities = productDetailRepo.findAll(pageable).getContent();
            for (ProductDetail item: entities) {
                ProductDetailDTO productDetailDTO = productDetailConvert.toDTO(item);
                results.add(productDetailDTO);
            }
            return results;
        }catch (Exception e) {
            logger.error(e.getMessage());
        }
        return results;
    }


    public int totalItem() {
        try {
            return (int) productDetailRepo.count();
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<ProductDetailDTO> findAll() {
        List<ProductDetailDTO> results = new ArrayList<>();
        List<ProductDetail> entities = productDetailRepo.findAll();
        for (ProductDetail item: entities) {
            ProductDetailDTO newDTO = productDetailConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
    public List<ProductDetailDTO> findAllIdProduct(long productid) {
        List<ProductDetailDTO> results = new ArrayList<>();
        List<ProductDetail> entities = productDetailRepo.findByProductId(productid);
        for (ProductDetail item: entities) {
            ProductDetailDTO newDTO = productDetailConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
    public ProductDetailDTO findBySku(String sku){
        ProductDetailDTO rs = new ProductDetailDTO();
        ProductDetail pd = productDetailRepo.findBySku(sku);
        return productDetailConvert.toDTO(pd);
    }
}
