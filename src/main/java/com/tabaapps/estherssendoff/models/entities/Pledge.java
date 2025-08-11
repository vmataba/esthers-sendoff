package com.tabaapps.estherssendoff.models.entities;

import com.tabaapps.estherssendoff.config.InternalId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
public class Pledge {

    @Id
    @InternalId
    private String id;

    @NotEmpty(message = "name is required")
    private String name;

    @NotEmpty(message = "phone is required")
    private String phone;

    @NotNull(message = "amount is required")
    @Column(nullable = false, columnDefinition = "double(22,2)")
    private Double amount;

    @Transient
    private Double totalPaid;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
