package com.FishOn.springbootfishapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "species")
@Data
public class Species {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "speciesid")
    private Long speciesId;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;


}
