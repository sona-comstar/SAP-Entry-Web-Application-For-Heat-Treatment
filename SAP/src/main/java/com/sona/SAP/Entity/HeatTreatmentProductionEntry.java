package com.sona.SAP.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "DIV_HeatTreatment_Production_Entry_Not_Approved")
public class HeatTreatmentProductionEntry {

    @Id
    @Column(name = "TriggerTime", nullable = false, unique = true)
    private LocalDateTime triggerTime;

    @Column(name = "colt_Part_Name")
    private String coltPartName;

    @Column(name = "colt_Plant")
    private String coltPlant;

    @Column(name = "cola_Quantity")
    private Integer colaQuantity;

    @Column(name = "colt_Machine")
    private String coltMachine;

    @Column(name = "colt_Batch")
    private String coltBatch;

//    @Column(name = "host")
//    private String hostName;
//
//    public String getHostName() {
//        return hostName;
//    }
//
//    public void setHostName(String hostName) {
//        this.hostName = hostName;
//    }
// Getters and Setters

    public LocalDateTime getTriggerTime() {
        return triggerTime;
    }

    public void setTriggerTime(LocalDateTime triggerTime) {
        this.triggerTime = triggerTime;
    }

    public String getColtPartName() {
        return coltPartName;
    }

    public void setColtPartName(String coltPartName) {
        this.coltPartName = coltPartName;
    }

    public String getColtPlant() {
        return coltPlant;
    }

    public void setColtPlant(String coltPlant) {
        this.coltPlant = coltPlant;
    }

    public Integer getColaQuantity() {
        return colaQuantity;
    }

    public void setColaQuantity(Integer colaQuantity) {
        this.colaQuantity = colaQuantity;
    }

    public String getColtMachine() {
        return coltMachine;
    }

    public void setColtMachine(String coltMachine) {
        this.coltMachine = coltMachine;
    }

    public String getColtBatch() {
        return coltBatch;
    }

    public void setColtBatch(String coltBatch) {
        this.coltBatch = coltBatch;
    }
}
