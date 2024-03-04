package com.FishOn.springbootfishapp.dao;

import com.FishOn.springbootfishapp.entity.Catch;
import com.FishOn.springbootfishapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CatchRepository extends JpaRepository<Catch, Long> {
    //List<Catch> findByUserId(User userId);

    List<Catch> findByUserId(User user);
}
