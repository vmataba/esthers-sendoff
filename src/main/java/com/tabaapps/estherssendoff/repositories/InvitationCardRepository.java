package com.tabaapps.estherssendoff.repositories;

import com.tabaapps.estherssendoff.models.entities.InvitationCard;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvitationCardRepository extends JpaRepository<InvitationCard, String> {

    @Override
    @NonNull
    @Query("select c from InvitationCard c order by c.createdAt desc")
    List<InvitationCard> findAll();

}
