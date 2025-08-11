package com.tabaapps.estherssendoff.controllers;

import com.tabaapps.estherssendoff.models.Response;
import com.tabaapps.estherssendoff.models.entities.InvitationCard;
import com.tabaapps.estherssendoff.services.InvitationCardService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/invitation-cards")
public class InvitationCardController {

    public final InvitationCardService invitationCardService;

    @PostConstruct
    void init() {
        // log.info("Found Invitation Card : {}",invitationCardService.findOne("001"));
    }


    @PostMapping
    public Response<InvitationCard> create(@RequestBody @Valid InvitationCard invitationCard) {
        return Response.<InvitationCard>builder()
                .status(HttpStatus.CREATED)
                .message("Invitation card created successfully")
                .body(invitationCardService.create(invitationCard))
                .build();
    }

    @GetMapping
    public Response<List<InvitationCard>> findAll() {
        return Response.<List<InvitationCard>>builder()
                .status(HttpStatus.OK)
                .message("Invitation cards found successfully")
                .body(invitationCardService.findAll())
                .build();
    }

    @GetMapping("/{id}")
    public Response<InvitationCard> findOne(@PathVariable String id) {
        return Response.<InvitationCard>builder()
                .status(HttpStatus.OK)
                .message("Invitation card found successfully")
                .body(invitationCardService.findOne(id))
                .build();
    }

    @PutMapping("/{id}")
    public Response<InvitationCard> update(@PathVariable String id, @RequestBody @Valid InvitationCard invitationCard) {
        return Response.<InvitationCard>builder()
                .status(HttpStatus.OK)
                .message("Invitation card updated successfully")
                .body(invitationCardService.update(id, invitationCard))
                .build();
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable String id) {
        invitationCardService.delete(id);
        return Response.<String>builder()
                .status(HttpStatus.OK)
                .message("Invitation card deleted successfully")
                .build();
    }

}
