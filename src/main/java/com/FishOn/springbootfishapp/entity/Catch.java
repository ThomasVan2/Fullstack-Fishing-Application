package com.FishOn.springbootfishapp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "catches")
@Data
public class Catch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "catchid")
    private Long catchId;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "fishid")
    private Fish fishId;

    @Column(name = "datecaught")
    private LocalDate date;

    @Column(name = "location")
    private String location;

    @Column(name = "size")
    private Double size;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "baitused")
    private String baitUsed;

    @Column(name = "description")
    private String description;

    @OneToOne(mappedBy = "associatedCatch", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private CatchImage image;

}
