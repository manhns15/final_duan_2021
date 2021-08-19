package com.example.demosecurity.Service.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;
@Service
public class MapValidationService {
    public ResponseEntity<?> mapValidation(BindingResult result){

        if(result.hasErrors()){
            // tao ra map chua key,value cua loi tra ve
            Map<String, String> erroMap = new HashMap<>();
            // duyet loi tra ve trong field
            for(FieldError error : result.getFieldErrors()){
                erroMap.put(error.getField(),error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String,String>>(erroMap, HttpStatus.BAD_REQUEST);
        }


        return null;
    }
}
