package com.example.demosecurity.Service.auth;

import com.example.demosecurity.Convert.ProductConvert;
import com.example.demosecurity.Convert.ProductDetailConvert;
import com.example.demosecurity.Repository.CategoryRep;
import com.example.demosecurity.Repository.ColorRepo;
import com.example.demosecurity.Repository.ProductRepo;
import com.example.demosecurity.Repository.SizeRepo;
import com.example.demosecurity.model.dto.ProductDTO;
import com.example.demosecurity.model.dto.ProductDetailDTO;
import com.example.demosecurity.model.entity.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private CategoryRep categoryRep;
    @Autowired
    private ProductConvert productConvert;

    @Autowired
    private ColorRepo colorRepo;
    @Autowired
    private SizeRepo sizeRepo;

    private static final Logger logger = LogManager.getLogger(ProductService.class);

    public String getAlphaNumericString(int n) {
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int) (AlphaNumericString.length()
                    * Math.random());
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString();
    }

    public ProductDTO save(ProductDTO productDTO) {
        Category category = categoryRep.findCategoryById(productDTO.getIdcategory());
        if (category != null) {
            Product product = productConvert.toEntity(productDTO);
            product.setCategory(category);
            Set<ProductDetail> listpt = new HashSet<>();
            for (ProductDetailDTO pt : productDTO.getProductDetails()) {
                ProductDetail productDetail = new ProductDetail();
                Size size = sizeRepo.findSizeById(pt.getIdsize());
                Color color = colorRepo.findColorById(pt.getIdcolor());
                productDetail.setColor(color);
                productDetail.setSize(size);

                productDetail.setSku("DHM" + getAlphaNumericString(5));
                productDetail.setQuantityProduct(pt.getQuantityProduct());
                productDetail.setPriceProductDetail(1);
                productDetail.setStatus(1);
                listpt.add(productDetail);
            }
            product.setProductDetail(listpt);

            productRepo.save(product);
            return productConvert.toDTO(product);
        }
        return null;
    }

    public ProductDTO update(ProductDTO productDTO) {
        Product oldproduct = productRepo.findProductById(productDTO.getId());
        Product newroduct = productConvert.toEntity(productDTO, oldproduct);
        Category category = categoryRep.findCategoryById(productDTO.getIdcategory());
        if (category != null) {
            Set<ProductDetail> listpt = new HashSet<>();
            for (ProductDetailDTO pt : productDTO.getProductDetails()) {
                ProductDetail productDetail = new ProductDetail();
                Size size = sizeRepo.findSizeById(pt.getIdsize());
                Color color = colorRepo.findColorById(pt.getIdcolor());
                productDetail.setProduct(newroduct);
                productDetail.setColor(color);
                productDetail.setSize(size);
                productDetail.setSku("DHM" + getAlphaNumericString(5));
                productDetail.setQuantityProduct(pt.getQuantityProduct());
                productDetail.setStatus(pt.getStatusDetail());
                productDetail.setPriceProductDetail(1);
                listpt.add(productDetail);
            }
            newroduct.setProductDetail(listpt);
            newroduct.setCategory(category);
            productRepo.save(newroduct);
            return productConvert.toDTO(newroduct);
        }
        return null;
    }

    public void delete(Long id) {
        try {
            Optional<Product> product = productRepo.findById(id);
            if (product != null) {
                productRepo.deleteById(id);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
    }


//    public List<ProductDTO> findAll(Pageable pageable) {
//        List<ProductDTO> results = new ArrayList<>();
//        try {
//            List<Product> entities = productRepo.findAll(pageable).getContent();
//            for (Product item : entities) {
//                ProductDTO productDTO = productConvert.toDTO(item);
//                results.add(productDTO);
//            }
//            return results;
//        } catch (Exception e) {
//            logger.error(e.getMessage());
//        }
//        return results;
//    }


    public int totalItem() {
        try {
            return (int) productRepo.count();
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return 1;
    }

    public List<ProductDTO> findAll() {
        List<ProductDTO> results = new ArrayList<>();
        List<Product> entities = productRepo.findAllByOrderByCreatedateAsc();
        for (Product item : entities) {
            ProductDTO newDTO = productConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }

    public ProductDTO findProductById(long id) {
        Product product = productRepo.findProductById(id);
        return productConvert.toDTO(product);
    }

    public List<ProductDTO> getProductByCategory(Long id) {
        List<ProductDTO> results = new ArrayList<>();
        List<Product> entities = productRepo.findByCategoryIdOrderByCreatedateDesc(id);
        for (Product item : entities) {
            ProductDTO newDTO = productConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }

    public List<ProductDTO> getProductByName(String name) {
        List<ProductDTO> results = new ArrayList<>();
        List<Product> entities = productRepo.findAllByNameproductContaining(name);
        for (Product item : entities) {
            ProductDTO newDTO = productConvert.toDTO(item);
            results.add(newDTO);
        }
        return results;
    }
}
