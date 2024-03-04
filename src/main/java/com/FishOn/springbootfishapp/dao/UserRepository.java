package com.FishOn.springbootfishapp.dao;

import com.FishOn.springbootfishapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserId(String userId);

}
