package com.sona.SAP.Repository;

import com.sona.SAP.Entity.HeatTreatmentProductionEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface HeatTreatmentProductionEntryRepository extends JpaRepository<HeatTreatmentProductionEntry, LocalDateTime> {
    }
