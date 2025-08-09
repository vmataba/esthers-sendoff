package com.tabaapps.estherssendoff.repositories;

import com.tabaapps.estherssendoff.models.entities.PledgeInstallment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PledgeInstallmentRepository extends JpaRepository<PledgeInstallment, String> {

    List<PledgeInstallment> findByPledgeId(String pledgeId);

}
