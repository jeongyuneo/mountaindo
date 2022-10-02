package com.hanssarang.backend.util;

import com.hanssarang.backend.common.exception.BadRequestException;
import com.hanssarang.backend.common.exception.FileSaveException;
import com.hanssarang.backend.hiking.controller.dto.PathResponse;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

import static com.hanssarang.backend.common.domain.ErrorMessage.FAIL_TO_SAVE_FILE;
import static com.hanssarang.backend.common.domain.ErrorMessage.WRONG_CONTENT_TYPE;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageUtil {

    private static final String DELIMITER = "-";

    public static String saveImage(String email, int trailId, MultipartFile multipartFile) {
        validateContentType(multipartFile);
        StringBuilder imageUploadPath = new StringBuilder(new File("/home/ubuntu").getAbsolutePath());
        imageUploadPath.append("/img");
        File imageFile = new File(imageUploadPath.toString());
        if (!imageFile.exists()) {
            imageFile.mkdir();
        }
        String fileName = email + DELIMITER + trailId + DELIMITER + LocalDateTime.now();
        imageUploadPath.append(File.separator).append(fileName);
        String imageUrl = imageUploadPath.toString();
        try {
            multipartFile.transferTo(new File(imageUrl));
        } catch (IOException e) {
            throw new FileSaveException(FAIL_TO_SAVE_FILE);
        }
        return imageUrl;
    }

    private static void validateContentType(MultipartFile multipartFile) {
        if (isWrongContentType(multipartFile.getContentType())) {
            throw new BadRequestException(WRONG_CONTENT_TYPE);
        }
    }

    private static boolean isWrongContentType(String contentType) {
        return !(contentType.contains("image/jpg") || contentType.contains("image/jpeg") || contentType.contains("image/png"));
    }
}
