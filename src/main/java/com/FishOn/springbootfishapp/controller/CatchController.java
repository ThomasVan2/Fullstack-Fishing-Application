package com.FishOn.springbootfishapp.controller;


import com.FishOn.springbootfishapp.dao.UserRepository;
import com.FishOn.springbootfishapp.dto.CatchDTO;
import com.FishOn.springbootfishapp.entity.Catch;
import com.FishOn.springbootfishapp.requestModels.CatchRequestModel;
import com.FishOn.springbootfishapp.service.CatchService;
import com.FishOn.springbootfishapp.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/catches")
public class CatchController {

    private CatchService catchService;
    private UserService userService;


    @Autowired
    public CatchController(CatchService catchService, UserService userService) {
        this.catchService = catchService;
        this.userService = userService;
    }


    @PostMapping("/log")
    public ResponseEntity<?> logCatchWithImage(@RequestParam("catchData") String catchDataJson,
                                               @RequestParam("image") MultipartFile image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            CatchRequestModel catchRequestModel = objectMapper.readValue(catchDataJson, CatchRequestModel.class);

            Catch savedCatch = catchService.saveCatchAndImage(catchRequestModel, image);

            return ResponseEntity.ok(savedCatch);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to log catch and upload image: " + e.getMessage());
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CatchDTO>> getCatchesByUserId(@PathVariable String userId) {
        List<CatchDTO> catches = catchService.findCatchesByUserId(userId);
        return ResponseEntity.ok(catches);
    }
}
