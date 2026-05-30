package com.pdfapp.pdf_utility;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "https://ups-docs-frontend.onrender.com") // Apne frontend URL ke hisab se check rakhna
public class PdfCompressController {

    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressPdf(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Try-with-resources me dono streams ko semi-colon (;) se separate kiya hai
        // Aur PDFBox 3.x ke liye Loader class ka use kiya hai
        try (PDDocument document = org.apache.pdfbox.Loader.loadPDF(file.getBytes());
             ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            
            // PDF metadata clear karke streams ko optimize aur compress karta hai
            document.setDocumentInformation(new org.apache.pdfbox.pdmodel.PDDocumentInformation());
            document.save(baos);

            byte[] pdfBytes = baos.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "Compressed_" + file.getOriginalFilename());

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}