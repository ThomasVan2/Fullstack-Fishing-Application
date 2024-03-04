package com.FishOn.springbootfishapp.dao;


import com.FishOn.springbootfishapp.entity.CatchImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatchImageRepository extends JpaRepository<CatchImage, Long> {
}

