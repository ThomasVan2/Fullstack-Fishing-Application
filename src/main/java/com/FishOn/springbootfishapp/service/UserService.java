package com.FishOn.springbootfishapp.service;

import com.FishOn.springbootfishapp.dao.CatchRepository;
import com.FishOn.springbootfishapp.dao.FishRepository;
import com.FishOn.springbootfishapp.dao.UserRepository;
import com.FishOn.springbootfishapp.entity.Catch;
import com.FishOn.springbootfishapp.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CatchRepository catchRepository;

    @Autowired
    private FishRepository fishRepository;


    public UserService(UserRepository userRepository, CatchRepository catchRepository, FishRepository fishRepository) {

        this.userRepository = userRepository;
        this.fishRepository = fishRepository;
        this.catchRepository = catchRepository;

    }

    public Optional<User> getUserByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }


    public List<Catch> getCatchesByUserId(User userId) {
        return catchRepository.findByUserId(userId);
    }

}
