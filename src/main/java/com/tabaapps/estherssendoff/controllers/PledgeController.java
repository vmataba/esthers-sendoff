package com.tabaapps.estherssendoff.controllers;

import com.tabaapps.estherssendoff.models.Response;
import com.tabaapps.estherssendoff.models.entities.Pledge;
import com.tabaapps.estherssendoff.models.entities.PledgeInstallment;
import com.tabaapps.estherssendoff.services.PledgeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pledges")
public class PledgeController {

    private final PledgeService pledgeService;

    @GetMapping
    public Response<List<Pledge>> findAll() {
        return Response.<List<Pledge>>builder()
                .status(HttpStatus.OK)
                .message("Pledges found successfully")
                .body(pledgeService.findAll())
                .build();
    }

    @PostMapping
    public Response<Pledge> create(@RequestBody @Valid Pledge pledge) {
        return Response.<Pledge>builder()
                .status(HttpStatus.CREATED)
                .message("Pledge created successfully")
                .body(pledgeService.create(pledge))
                .build();
    }

    @GetMapping("/{id}")
    public Response<Pledge> findOne(@PathVariable String id) {
        return Response.<Pledge>builder()
                .status(HttpStatus.OK)
                .message("Pledge found successfully")
                .body(pledgeService.findOne(id))
                .build();
    }

    @PutMapping("/{id}")
    public Response<Pledge> update(@PathVariable String id, @RequestBody @Valid Pledge pledge) {
        return Response.<Pledge>builder()
                .status(HttpStatus.OK)
                .message("Pledge updated successfully")
                .body(pledgeService.update(id, pledge))
                .build();
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable String id) {
        pledgeService.delete(id);
        return Response.<String>builder()
                .status(HttpStatus.OK)
                .message("Pledge deleted successfully")
                .build();
    }

    @PostMapping("/{id}/installments")
    public Response<List<PledgeInstallment>> addInstallments(@PathVariable String id,
                                                             @RequestBody List<Double> installments) {
        return Response.<List<PledgeInstallment>>builder()
                .status(HttpStatus.OK)
                .message("Installments added successfully")
                .body(pledgeService.addInstallments(id, installments))
                .build();
    }

    @GetMapping("/{id}/installments")
    public Response<List<PledgeInstallment>> loadInstallments(@PathVariable String id) {
        return Response.<List<PledgeInstallment>>builder()
                .status(HttpStatus.OK)
                .message("Installments loaded successfully")
                .body(pledgeService.loadInstallments(id))
                .build();
    }

    @DeleteMapping("/{id}/installments")
    public Response<List<PledgeInstallment>> removeInstallments(@PathVariable String id,
                                                                @RequestBody List<String> installmentIds) {
        return Response.<List<PledgeInstallment>>builder()
                .status(HttpStatus.OK)
                .message("Installments removed successfully")
                .body(pledgeService.removeInstallments(id, installmentIds))
                .build();
    }


}
