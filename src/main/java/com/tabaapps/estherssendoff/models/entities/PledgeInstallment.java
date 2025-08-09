package com.tabaapps.estherssendoff.models.entities;

import com.tabaapps.estherssendoff.config.InternalId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
public class PledgeInstallment {

    @Id
    @InternalId
    private String id;

    @Column(nullable = false)
    private String pledgeId;

    @Column(nullable = false, columnDefinition = "double(22,2)")
    private Double amount;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
