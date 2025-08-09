package com.tabaapps.estherssendoff.repositories;

import com.tabaapps.estherssendoff.models.entities.Pledge;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PledgeRepository extends JpaRepository<Pledge, String> {

    @Override
    @NonNull
    @Query("select p from Pledge p order by p.createdAt desc")
    List<Pledge> findAll();

}
