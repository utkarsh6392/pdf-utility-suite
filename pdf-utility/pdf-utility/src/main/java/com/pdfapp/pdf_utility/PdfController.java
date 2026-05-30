package com.pdfapp.pdf_utility;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "https://ups-docs-frontend.onrender.com")
public class PdfController {

    private final PdfService pdfService;

    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }

    @PostMapping("/convert/images")
    public ResponseEntity<byte[]> convertImagesToPdf(@RequestParam("files") List<MultipartFile> files) {
        try { 
            return createResponse(pdfService.convertImagesToPdf(files), "UPS_DOCS_Images.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/merge")
    public ResponseEntity<byte[]> mergePdfs(@RequestParam("files") List<MultipartFile> files) {
        try { 
            return createResponse(pdfService.mergePdfs(files), "UPS_DOCS_Merged.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/extract-text")
    public ResponseEntity<byte[]> extractText(@RequestParam("file") MultipartFile file) {
        try { 
            return createResponse(pdfService.extractText(file), "UPS_DOCS_Extracted.txt", MediaType.TEXT_PLAIN); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/split")
    public ResponseEntity<byte[]> splitPdf(@RequestParam("file") MultipartFile file, @RequestParam("start") int start, @RequestParam("end") int end) {
        try { 
            return createResponse(pdfService.splitPdf(file, start, end), "UPS_DOCS_Split.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/compress")
    public ResponseEntity<byte[]> compressPdf(@RequestParam("file") MultipartFile file) {
        try { 
            return createResponse(pdfService.compressPdf(file), "UPS_DOCS_Compressed.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/rotate")
    public ResponseEntity<byte[]> rotatePdf(@RequestParam("file") MultipartFile file, @RequestParam("degrees") int degrees) {
        try { 
            return createResponse(pdfService.rotatePdf(file, degrees), "UPS_DOCS_Rotated.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    @PostMapping("/protect")
    public ResponseEntity<byte[]> protectPdf(@RequestParam("file") MultipartFile file, @RequestParam("password") String password) {
        try { 
            return createResponse(pdfService.protectPdf(file, password), "UPS_DOCS_Locked.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/add-text")
    public ResponseEntity<byte[]> addTextToPdf(@RequestParam("file") MultipartFile file, @RequestParam("text") String text, @RequestParam("x") int x, @RequestParam("y") int y) {
        try { 
            return createResponse(pdfService.addTextToPdf(file, text, x, y), "UPS_DOCS_Edited.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    private ResponseEntity<byte[]> createResponse(byte[] data, String filename, MediaType mediaType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentDispositionFormData("attachment", filename);
        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }
    @PostMapping("/extract-csv")
    public ResponseEntity<byte[]> extractTableToCsv(@RequestParam("file") MultipartFile file) {
        try { 
            // Iska MediaType 'text/csv' hota hai, 'application/pdf' nahi
            return createResponse(pdfService.extractTableToCsv(file), "UPS_DOCS_Data.csv", MediaType.parseMediaType("text/csv")); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    @PostMapping("/convert/word")
    public ResponseEntity<byte[]> convertPdfToWord(@RequestParam("file") MultipartFile file) {
        try { 
            // Returning as legacy MS Word MIME type
            return createResponse(pdfService.convertPdfToWord(file), "UPS_DOCS_Converted.doc", MediaType.parseMediaType("application/msword")); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    @PostMapping("/unlock")
    public ResponseEntity<byte[]> unlockPdf(@RequestParam("file") MultipartFile file, @RequestParam("password") String password) {
        try { 
            return createResponse(pdfService.unlockPdf(file, password), "UPS_DOCS_Unlocked.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    @PostMapping("/redact")
    public ResponseEntity<byte[]> redactPdf(@RequestParam("file") MultipartFile file, @RequestParam("keyword") String keyword) {
        try { 
            return createResponse(pdfService.redactPdf(file, keyword), "UPS_DOCS_Redacted.txt", MediaType.TEXT_PLAIN); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }

    @PostMapping("/reorder")
    public ResponseEntity<byte[]> reorderPdf(@RequestParam("file") MultipartFile file, @RequestParam("order") List<Integer> order) {
        try { 
            return createResponse(pdfService.reorderPdf(file, order), "UPS_DOCS_Reordered.pdf", MediaType.APPLICATION_PDF); 
        } catch (Exception e) { 
            e.printStackTrace(); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
}