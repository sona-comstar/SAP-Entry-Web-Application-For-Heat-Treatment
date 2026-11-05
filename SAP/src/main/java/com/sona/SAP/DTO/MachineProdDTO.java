package com.sona.SAP.DTO;

public class MachineProdDTO {

    private String prodVersion;
    private String machineNo;

    public MachineProdDTO(String prodVersion, String machineNo) {
        this.prodVersion = prodVersion;
        this.machineNo = machineNo;
    }

    public String getProdVersion() {
        return prodVersion;
    }

    public String getMachineNo() {
        return machineNo;
    }
}

