package com.tabaapps.estherssendoff.services;

import com.tabaapps.estherssendoff.exceptions.InternalException;
import com.tabaapps.estherssendoff.models.entities.InvitationCard;
import com.tabaapps.estherssendoff.repositories.InvitationCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class InvitationCardService {

    private final InvitationCardRepository invitationCardRepository;

    public InvitationCard create(InvitationCard invitationCard) {
        return invitationCardRepository.save(invitationCard);
    }

    public InvitationCard findOne(String id) {
        return invitationCardRepository.findById(id)
                .orElseThrow(() -> new InternalException(HttpStatus.NOT_FOUND, "Invitation card not found"));
    }

    public InvitationCard update(String id, InvitationCard payload) {
        InvitationCard card = findOne(id);
        card.setName(payload.getName());
        card.setPhone(payload.getPhone());
        return invitationCardRepository.save(card);
    }

    public List<InvitationCard> findAll() {
        return invitationCardRepository.findAll();
    }

    public void delete(String id) {
        invitationCardRepository.deleteById(id);
    }
}
