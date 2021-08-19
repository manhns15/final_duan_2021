package com.example.demosecurity.Controller;

import com.example.demosecurity.Service.auth.ImageService;
import com.example.demosecurity.model.dto.UploadResponseMessage;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin("*")
@RestController
@RequestMapping("/images")
public class ImageController {
    private final ImageService fileService;

    @Autowired
    public ImageController(ImageService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("{pid}")
    public void downloadImage(@PathVariable("pid") String pid, HttpServletResponse response)
    {
        try {
            File fileToDownload = new File("/duan2021/upload/" + pid);

            try (InputStream inputStream = new FileInputStream(fileToDownload)) {
                response.setContentType("application/force-download");
                response.setHeader("Content-Disposition", "attachment; filename=" + pid);
                IOUtils.copy(inputStream, response.getOutputStream());
                response.flushBuffer();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/upload")
    public ResponseEntity<UploadResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
            fileService.save(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UploadResponseMessage("Uploaded the file successfully: " + file.getOriginalFilename()));
    }

    @DeleteMapping("{pid}")
    public void deleteFile(@PathVariable("pid") String pid)
    {
        try {
            Path fileToDelete = Paths.get("/duan2021/upload/" + pid);

            if (Files.exists(fileToDelete)) {
                Files.delete(fileToDelete);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
