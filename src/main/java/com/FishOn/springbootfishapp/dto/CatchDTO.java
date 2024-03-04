package com.FishOn.springbootfishapp.dto;

import java.time.LocalDate;

public class CatchDTO {

    private LocalDate date;
    private String location;
    private Double size;
    private Double weight;
    private String baitUsed;
    private String description;
    private String fishName;
    private String fishId;
    private String image;
    private String userName;

    // Getters and setters

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getSize() {
        return size;
    }

    public void setSize(Double size) {
        this.size = size;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getBaitUsed() {
        return baitUsed;
    }

    public void setBaitUsed(String baitUsed) {
        this.baitUsed = baitUsed;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFishName() {
        return fishName;
    }

    public void setFishName(String fishName) {
        this.fishName = fishName;
    }


    public String getFishId() {
        return fishId;
    }

    public void setFishId(String fishId) {
        this.fishId = fishId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}






