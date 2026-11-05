package com.sona.SAP.Controller;

import com.sona.SAP.DTO.MachineProdDTO;
import com.sona.SAP.Entity.HeatTreatmentProductionEntry;
import com.sona.SAP.Repository.HeatTreatmentProductionEntryRepository;
import com.sona.SAP.Service.HeatTreatmentProductionEntryService;
import jakarta.servlet.http.HttpServletRequest;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/entries")
public class HeatTreatmentProductionEntryController {

    @Autowired
    private HeatTreatmentProductionEntryRepository repository;
    @Autowired
    private HeatTreatmentProductionEntryService heatTreatmentProductionEntryService;


    // Gear Shop API's

       @GetMapping("/dropdownGearShop")
public Map<String, List<MachineProdDTO>> fetchDropdownValuesForGearShop(
        @RequestParam String sheetName) throws IOException {
    return heatTreatmentProductionEntryService.fetchPartNameToMachineMap(sheetName);
}

    @PostMapping("/gearShop")
    public ResponseEntity<?> createEntryForGearShop(
            @RequestBody HeatTreatmentProductionEntry entry,
            HttpServletRequest request) {

        // Ensure TriggerTime exists
        if (entry.getTriggerTime() == null) {
            entry.setTriggerTime(LocalDateTime.now());
        }

        HeatTreatmentProductionEntry savedEntry = repository.save(entry);
        return ResponseEntity.ok(savedEntry);
    }

     @GetMapping("/sheet-names")
    public List<String> getSheetNames() {

        ClassPathResource resource =
                new ClassPathResource("AUTO SAP ENTRY MASTER LIST FOR WEB INTERFACE.xlsx");

        List<String> sheetNames = new ArrayList<>();

        try (InputStream inputStream = resource.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
                sheetNames.add(workbook.getSheetName(i));
            }

        } catch (IOException e) {
            throw new RuntimeException("Unable to read Excel sheet names", e);
        }

        return sheetNames;
    }
}
