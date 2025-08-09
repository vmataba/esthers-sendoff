package com.tabaapps.estherssendoff.services;

import com.tabaapps.estherssendoff.exceptions.InternalException;
import com.tabaapps.estherssendoff.models.entities.Pledge;
import com.tabaapps.estherssendoff.models.entities.PledgeInstallment;
import com.tabaapps.estherssendoff.repositories.PledgeInstallmentRepository;
import com.tabaapps.estherssendoff.repositories.PledgeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PledgeService {

    private final PledgeRepository pledgeRepository;

    private final PledgeInstallmentRepository pledgeInstallmentRepository;

    public Pledge create(Pledge pledge) {
        return pledgeRepository.save(pledge);
    }

    public Pledge findOne(String id) {
        return pledgeRepository.findById(id)
                .orElseThrow(() -> new InternalException(HttpStatus.NOT_FOUND, "Pledge not found"));
    }

    public Pledge update(String id, Pledge payload) {
        Pledge pledge = findOne(id);
        pledge.setName(payload.getName());
        pledge.setAmount(payload.getAmount());
        return pledgeRepository.save(pledge);
    }

    public List<Pledge> findAll() {
        return pledgeRepository.findAll();
    }

    public void delete(String id) {
        pledgeRepository.deleteById(id);
    }

    public List<PledgeInstallment> addInstallments(String id, List<Double> installments) {
        pledgeRepository.findById(id)
                .orElseThrow(() -> new InternalException(HttpStatus.NOT_FOUND, "Pledge not found"));
        List<PledgeInstallment> pledgeInstallments = installments.stream()
                .map(amount -> {
                    PledgeInstallment installment = new PledgeInstallment();
                    installment.setPledgeId(id);
                    installment.setAmount(amount);
                    return installment;
                })
                .toList();
        return pledgeInstallmentRepository.saveAll(pledgeInstallments);
    }

    public List<PledgeInstallment> removeInstallments(String id, List<String> installmentIds) {
        pledgeRepository.findById(id)
                .orElseThrow(() -> new InternalException(HttpStatus.NOT_FOUND, "Pledge not found"));
        pledgeInstallmentRepository.deleteAllById(installmentIds);
        return pledgeInstallmentRepository.findByPledgeId(id);
    }

    public List<PledgeInstallment> loadInstallments(String id) {
        return pledgeInstallmentRepository.findByPledgeId(id);
    }
}
