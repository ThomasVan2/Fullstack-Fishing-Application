package com.FishOn.springbootfishapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "fishes")
@Data
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishid")
    private Long id;

    @Column(name = "commonname")
    private String commonName;

    @ManyToOne
    @JoinColumn(name = "speciesid")
    private Species species;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "Description")
    private String description;

    @Column(name = "habitat")
    private String habitat;

    @Column(name = "image_url")
    private String imageUrl;


}
