package com.FishOn.springbootfishapp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "catch_images")
public class CatchImage {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "photoid")
        private Long photoId;

        @JsonBackReference
        @OneToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "catchid", referencedColumnName = "catchid")
        private Catch associatedCatch;

        @Column(name = "photourl")
        private String photoUrl;
}
