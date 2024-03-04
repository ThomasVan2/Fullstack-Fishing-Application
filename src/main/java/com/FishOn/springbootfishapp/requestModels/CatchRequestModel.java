package com.FishOn.springbootfishapp.requestModels;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Data
public class CatchRequestModel {

    private String userId;
    private Long fishId;
    private Double size;
    private Double weight;
    private String location;
    private LocalDate date;
    private String baitUsed;
    private String description;


}
