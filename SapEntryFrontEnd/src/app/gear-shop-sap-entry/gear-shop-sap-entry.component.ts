import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SapServiceService } from "../sap-service.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gear-shop-sap-entry',
  templateUrl: './gear-shop-sap-entry.component.html',
  styleUrl: './gear-shop-sap-entry.component.css',
  providers: [MessageService],
})
export class GearShopSapEntryComponent implements OnInit {

  sapForm!: FormGroup;
  isLoading = false;

  sheetNames: any[] = [];
  partNames: any[] = [];
  prodVersionOptions: any[] = [];
  machineOptions: any[] = [];

  partNameToMachineMap: any = {};
  selectedRows: any[] = [];

  constructor(
    private fb: FormBuilder,
    private sap: SapServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.sapForm = this.fb.group({
      // sheetName: ['', Validators.required],
      coltPartName: ['', Validators.required],
      coltPlant: ['1004', Validators.required],
      colaQuantity: ['', Validators.required],
      prodVersion: ['', Validators.required],
      coltMachine: [''],
      coltBatch: [
                    '',
                    [
                      Validators.required,
                      Validators.pattern(/^[A-Za-z0-9]{5}$/)
                    ]
                  ]
    });

    // this.fetchSheetNames();
    this.fetchPartNames('HEAT TREATMENT');
    this.sapForm.get('coltBatch')?.valueChanges.subscribe(val => {
  if (val) {
    this.sapForm.get('coltBatch')?.setValue(val.toUpperCase(), {
      emitEvent: false
    });
  }
});

  }

  // ================= FETCH SHEET NAMES =================
  fetchSheetNames(): void {
    this.sap.getSheetNames().subscribe({
      next: (data) => {
        this.sheetNames = data.map((name: string) => ({
          label: name,
          value: name
        }));
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load Sheet Names'
        });
      }
    });
  }

  // ================= SHEET NAME CHANGE =================
  // onSheetNameChange(event: any): void {
  //   const sheetName = event.value;
    
  //   // Reset all dependent fields
  //   this.partNames = [];
  //   this.machineOptions = [];
  //   this.prodVersionOptions = [];
  //   this.partNameToMachineMap = {};
  //   this.selectedRows = [];
    
  //   this.sapForm.patchValue({
  //     coltPartName: '',
  //     coltMachine: '',
  //     prodVersion: ''
  //   });

  //   // Fetch part names for selected sheet
  //   this.fetchPartNames(sheetName);
  // }

  // ================= FETCH PART NAMES =================
  fetchPartNames(sheetName: string): void {
    this.sap.getDropdownValuesForGearShop(sheetName).subscribe({
      next: (data) => {
        this.partNameToMachineMap = data;

        this.partNames = Object.keys(data).map(p => ({
          label: p,
          value: p
        }));
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load Part Names'
        });
      }
    });
  }

  // ================= PART NAME CHANGE =================
  onPartNameChange(event: any): void {
    const partName = event.value;
    this.selectedRows = this.partNameToMachineMap[partName] || [];

    // Build UNIQUE machine list
    const machineSet = new Set<string>();

    this.selectedRows.forEach((r: any) => {
        if (r.machineNo) {
          r.machineNo.split(',').forEach((m: string) => {
            machineSet.add(m.trim());
          });
        }
      });
    console.log(machineSet);
    
    this.machineOptions = Array.from(machineSet).map(m => ({
      label: m,
      value: m
    }));

    // Reset dependent fields
    this.prodVersionOptions = [];
    this.sapForm.patchValue({
      coltMachine: '',
      prodVersion: ''
    });
  }

  // ================= MACHINE CHANGE =================
  onMachineChange(event: any): void {
    const machine = event.value;

    const filtered = this.selectedRows.filter(
      (r: any) => r.machineNo === machine
    );

    this.prodVersionOptions = filtered.map((r: any) => ({
      label: r.prodVersion,
      value: r.prodVersion
    }));

    // Auto-select if only one prod version
    if (this.prodVersionOptions.length === 1) {
      this.sapForm.patchValue({
        prodVersion: this.prodVersionOptions[0].value
      });
    } else {
      this.sapForm.patchValue({
        prodVersion: ''
      });
    }
  }

  onBatchInput(event: Event): void {
  const input = event.target as HTMLInputElement;

  input.value = input.value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 5);

  this.sapForm.get('coltBatch')?.setValue(input.value, {
    emitEvent: false
  });
}

  // ================= SUBMIT =================
  onSubmit(): void {
    if (this.sapForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please fill all required fields'
      });
      return;
    }

    this.isLoading = true;

    const payload = {
      triggerTime: null,
      coltPartName: this.sapForm.value.coltPartName,
      coltPlant: this.sapForm.value.coltPlant,
      colaQuantity: this.sapForm.value.colaQuantity,
      coltMachine: this.sapForm.value.prodVersion,
      coltBatch: this.sapForm.value.coltBatch
    };

    console.log('Submitting:', payload);

    this.sap.submitEntryGearShop(payload).subscribe({
      next: () => {
  this.isLoading = false;

  this.sapForm.reset({
    coltPartName: '',
    coltPlant: '1004',
    colaQuantity: '',
    prodVersion: '',
    coltMachine: '',
    coltBatch: ''
  });

  // Clear dependent dropdowns
  this.prodVersionOptions = [];
  this.machineOptions = [];
  this.selectedRows = [];
  this.partNameToMachineMap = {};

  // Reload Part Name dropdown
  this.fetchPartNames('HEAT TREATMENT');

  this.messageService.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Data submitted successfully'
  });
},
      error: () => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Submission failed'
        });
      }
    });
  }
}