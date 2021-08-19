package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.SizeService;
import com.example.demosecurity.model.dto.ColorDTO;
import com.example.demosecurity.model.dto.SizeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("v1/api")
public class SizeController {
    @Autowired
    private SizeService sizeService;
    @GetMapping("/sizes")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<SizeDTO> getAll() {
        return sizeService.findAll();
    }

    @PostMapping("/size")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public SizeDTO createCategory(@RequestBody SizeDTO sizeDTO) {
        return sizeService.save(sizeDTO);
    }

    @PutMapping(value = "/size/{id}")
    public SizeDTO updateNew(@RequestBody SizeDTO sizeDTO, @PathVariable("id") long id) {
        sizeDTO.setId(id);
        return sizeService.update(sizeDTO);
    }

    @DeleteMapping(value = "/size/{id}")
    public void deleteNew(@PathVariable("id") Long id) {
        sizeService.delete(id);
    }
}
