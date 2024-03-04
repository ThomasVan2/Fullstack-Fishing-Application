package com.FishOn.springbootfishapp.dao;

import com.FishOn.springbootfishapp.entity.Fish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface FishRepository extends JpaRepository<Fish, Long> {

    Page<Fish> findByCommonNameContaining(@RequestParam("commonname") String commonName, Pageable pageable);

    //List<Fish> findByUserId(String userId);
}

