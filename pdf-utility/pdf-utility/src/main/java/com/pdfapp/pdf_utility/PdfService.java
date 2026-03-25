package com.pdfapp.pdf_utility;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfService {

    // 1. Images to PDF
    public byte[] convertImagesToPdf(List<MultipartFile> imageFiles) throws IOException {
        try (PDDocument document = new PDDocument()) {
            for (MultipartFile imageFile : imageFiles) {
                PDImageXObject pdImage = PDImageXObject.createFromByteArray(
                        document, imageFile.getBytes(), imageFile.getOriginalFilename());
                PDRectangle pageSize = new PDRectangle(pdImage.getWidth(), pdImage.getHeight());
                PDPage page = new PDPage(pageSize);
                document.addPage(page);
                try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                    contentStream.drawImage(pdImage, 0, 0, pdImage.getWidth(), pdImage.getHeight());
                }
            }
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }

    // 2. Merge PDFs
    public byte[] mergePdfs(List<MultipartFile> pdfFiles) throws IOException {
        PDFMergerUtility merger = new PDFMergerUtility();
        ByteArrayOutputStream destinationStream = new ByteArrayOutputStream();
        merger.setDestinationStream(destinationStream);
        for (MultipartFile file : pdfFiles) {
            merger.addSource(new RandomAccessReadBuffer(file.getInputStream()));
        }
        merger.mergeDocuments(null);
        return destinationStream.toByteArray();
    }

    // 3. Extract Text (Fixed Loader)
    public byte[] extractText(MultipartFile file) throws IOException {
        try (RandomAccessReadBuffer buffer = new RandomAccessReadBuffer(file.getInputStream());
             PDDocument document = Loader.loadPDF(buffer)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String extractedText = stripper.getText(document);
            return extractedText.getBytes(); 
        }
    }

    // 4. Split PDF (Fixed Loader)
    public byte[] splitPdf(MultipartFile file, int startPage, int endPage) throws IOException {
        try (RandomAccessReadBuffer buffer = new RandomAccessReadBuffer(file.getInputStream());
             PDDocument originalDoc = Loader.loadPDF(buffer);
             PDDocument newDoc = new PDDocument()) {
            
            int totalPages = originalDoc.getNumberOfPages();
            int start = Math.max(0, startPage - 1);
            int end = Math.min(totalPages, endPage);
            
            for (int i = start; i < end; i++) {
                newDoc.addPage(originalDoc.getPage(i));
            }
            
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            newDoc.save(baos);
            return baos.toByteArray();
        }
    }

    // 5. Compress PDF (Fixed Loader)
    public byte[] compressPdf(MultipartFile file) throws IOException {
        try (RandomAccessReadBuffer buffer = new RandomAccessReadBuffer(file.getInputStream());
             PDDocument document = Loader.loadPDF(buffer)) {
            document.setDocumentInformation(null); 
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos); 
            return baos.toByteArray();
        }
    }

    // 6. Rotate PDF (Fixed Loader)
    public byte[] rotatePdf(MultipartFile file, int degrees) throws IOException {
        try (RandomAccessReadBuffer buffer = new RandomAccessReadBuffer(file.getInputStream());
             PDDocument document = Loader.loadPDF(buffer)) {
            for (PDPage page : document.getPages()) {
                int currentRotation = page.getRotation();
                page.setRotation((currentRotation + degrees) % 360);
            }
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }

    // 7. Add Text to PDF (Fixed Loader)
    public byte[] addTextToPdf(MultipartFile file, String text, int xAxis, int yAxis) throws IOException {
        try (RandomAccessReadBuffer buffer = new RandomAccessReadBuffer(file.getInputStream());
             PDDocument document = Loader.loadPDF(buffer)) {
            PDType1Font font = new PDType1Font(FontName.HELVETICA_BOLD);
            
            for (PDPage page : document.getPages()) {
                try (PDPageContentStream cs = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
                    cs.beginText();
                    cs.setFont(font, 24);
                    cs.setNonStrokingColor(0, 0, 0); 
                    cs.newLineAtOffset(xAxis, yAxis); 
                    cs.showText(text);
                    cs.endText();
                }
            }
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }
}