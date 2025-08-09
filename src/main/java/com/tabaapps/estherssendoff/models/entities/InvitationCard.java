package com.tabaapps.estherssendoff.models.entities;

import com.tabaapps.estherssendoff.config.InternalId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class InvitationCard {

    @Id
    @InternalId
    private String id;

    @NotEmpty(message = "name is required")
    private String name;

    @NotEmpty(message = "phone is required")
    private String phone;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
