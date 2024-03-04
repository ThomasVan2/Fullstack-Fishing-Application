package com.FishOn.springbootfishapp.controller;


import com.FishOn.springbootfishapp.entity.Catch;
import com.FishOn.springbootfishapp.entity.User;
import com.FishOn.springbootfishapp.requestModels.CatchRequestModel;
import com.FishOn.springbootfishapp.requestModels.UserRequestModel;
import com.FishOn.springbootfishapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/userSub")
    public ResponseEntity<?> getUserInfo(@PathVariable String userSub) {

        Optional<User> user = userService.getUserByUserId(userSub);
        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }


    }






}
