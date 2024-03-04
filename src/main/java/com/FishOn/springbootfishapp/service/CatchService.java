package com.FishOn.springbootfishapp.service;


import com.FishOn.springbootfishapp.dao.CatchImageRepository;
import com.FishOn.springbootfishapp.dao.CatchRepository;
import com.FishOn.springbootfishapp.dao.FishRepository;
import com.FishOn.springbootfishapp.dao.UserRepository;
import com.FishOn.springbootfishapp.dto.CatchDTO;
import com.FishOn.springbootfishapp.entity.Catch;
import com.FishOn.springbootfishapp.entity.CatchImage;
import com.FishOn.springbootfishapp.entity.Fish;
import com.FishOn.springbootfishapp.entity.User;
import com.FishOn.springbootfishapp.requestModels.CatchRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class CatchService {
    @Autowired
    private CatchRepository catchRepository;
    @Autowired
    private FishRepository fishRepository;
    @Autowired
    private CatchImageRepository catchImageRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;


    public CatchService(CatchRepository catchRepository, FishRepository fishRepository,
                        CatchImageRepository catchImageRepository, UserRepository userRepository) {

        this.catchRepository = catchRepository;
        this.fishRepository = fishRepository;
        this.catchImageRepository = catchImageRepository;
        this.userRepository = userRepository;


    }

    public Catch logCatch(CatchRequestModel catchRequestModel) {

        User user = userRepository.findById(catchRequestModel.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Fish fish = fishRepository.findById(catchRequestModel.getFishId()).orElseThrow(() -> new RuntimeException("Fish not found"));


        Catch catchLog = new Catch();

        catchLog.setUserId(user);
        catchLog.setFishId(fish);

        if (catchRequestModel.getLocation() != null) {
            catchLog.setLocation(catchRequestModel.getLocation());
        }

        if (catchRequestModel.getDate() == null) {
            catchLog.setDate(LocalDate.now());
        } else {
            catchLog.setDate(catchRequestModel.getDate());
        }

        if (catchRequestModel.getSize() != null) {
            catchLog.setSize(catchRequestModel.getSize());
        }

        if (catchRequestModel.getWeight() != null) {
            catchLog.setWeight(catchRequestModel.getWeight());
        }

        if (catchRequestModel.getBaitUsed() != null) {
            catchLog.setBaitUsed(catchRequestModel.getBaitUsed());
        }

        if (catchRequestModel.getDescription() != null) {
            catchLog.setDescription(catchRequestModel.getDescription());
        }

        return catchRepository.save(catchLog);
    }


    public Catch saveCatchAndImage(CatchRequestModel catchRequestModel, MultipartFile imageFile) throws IOException {

        Catch savedCatch = logCatch(catchRequestModel);

        if (imageFile != null && !imageFile.isEmpty()) {
            String photoUrl = storeImage(imageFile);

            CatchImage catchImage = new CatchImage();
            catchImage.setAssociatedCatch(savedCatch);
            catchImage.setPhotoUrl(photoUrl);


            CatchImage savedCatchImage = catchImageRepository.save(catchImage); // Save CatchImage

            // Assuming there's a setter method or way to associate the CatchImage with the Catch
            savedCatch.setImage(savedCatchImage); // Associate the image with the catch
            savedCatch = catchRepository.save(savedCatch); // Save the Catch entity again with its image

        }

        return savedCatch;
    }

    public String storeImage(MultipartFile imageFile) throws IOException {
        if (imageFile.isEmpty()) {
            throw new IllegalStateException("Cannot store an empty file.");
        }

        // Generate a unique filename to avoid overwriting existing files
        String originalFilename = imageFile.getOriginalFilename();
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID() + fileExtension;

        // Resolve the file storage path
        Path storagePath = Paths.get(uploadDir).resolve(filename);

        // Ensure the directory exists
        if (!Files.exists(storagePath.getParent())) {
            Files.createDirectories(storagePath.getParent());
        }

        // Save the file on the filesystem
        Files.copy(imageFile.getInputStream(), storagePath);

        // Return a path or URL where the file can be accessed

        // For local testing, this might just be the relative path
        return filename; // Or construct a URL based on your server's address
    }


    public List<CatchDTO> findCatchesByUserId(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        List<Catch> catches = catchRepository.findByUserId(user);
        return catches.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CatchDTO convertToDTO(Catch catchEntity) {
        CatchDTO dto = new CatchDTO();
        dto.setDate(catchEntity.getDate());
        dto.setLocation(catchEntity.getLocation());
        dto.setSize(catchEntity.getSize());
        dto.setWeight(catchEntity.getWeight());
        dto.setBaitUsed(catchEntity.getBaitUsed());
        dto.setDescription(catchEntity.getDescription());
        dto.setFishId(String.valueOf(catchEntity.getFishId().getId()));
        if (catchEntity.getFishId() != null) {
            dto.setFishName(catchEntity.getFishId().getCommonName());
        }

        if (catchEntity.getImage() != null) {
            dto.setImage(catchEntity.getImage().getPhotoUrl());
        }
        dto.setUserName(catchEntity.getUserId().getUserName());


        // Add other fields as necessary
        return dto;
    }
}


