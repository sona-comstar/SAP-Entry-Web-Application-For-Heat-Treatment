import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SapServiceService} from "../sap-service.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-heat-treatment-sap-entry',
  templateUrl: './heat-treatment-sap-entry.component.html',
  styleUrl: './heat-treatment-sap-entry.component.css',
  providers: [MessageService],
})
export class HeatTreatmentSapEntryComponent {
  coltPartName: string = '';
  coltAreaName: string = '';
  coltPlant: string = '';
  colaQuantity: string = '';
  coltMachine: string = '';
  coltBatch: string = '';
  partNames: any[] = [];
  areaName: any[] = [];
  sapForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  partNameToMachineMap: { [key: string]: string } = {};
  showMachineDropdown: boolean= false;
  machineValues: any;



  constructor(private fb: FormBuilder,private sap: SapServiceService,private messageService : MessageService) {
    this.sapForm = this.fb.group({
      coltPartName: ['', Validators.required],
      coltPlant: ['1004', Validators.required], // Fixed value for coltPlant
      colaQuantity: ['', Validators.required],
      coltMachine: ['', Validators.required],
      coltBatch: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.fetchPartNames();
  }

  fetchPartNames(): void {
    this.sap.getDropdownValues().subscribe(
      (data) => {
        // console.log(data);

        // Check if data is an object and transform it
        if (typeof data === 'object' && data !== null) {
          // Extract part names and map them to dropdown options
          this.partNames = Object.keys(data).map(partName => ({
            label: partName,  // Use partName as label
            value: partName   // Use partName as value
          }));

          // Store the map for partName -> coltMachine
          this.partNameToMachineMap = data;

          // console.log(this.partNames);
        } else {
          console.error('Unexpected data format', data);
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to fetch the Part Name value' });
      }
    );
  }

  onPartNameChange(event: any) {
    const selectedPartName = event.value;

    // Set the selected partName in the form as the value
    this.sapForm.patchValue({
      coltPartName: selectedPartName // Only store the value in form control
    });

    const selectedMachine = this.partNameToMachineMap[selectedPartName];

    // Ensure selectedMachine is an array or string
    let machineValues: string[] = [];
    if (Array.isArray(selectedMachine)) {
      // If it's already an array, use it as it is
      machineValues = selectedMachine;
    } else if (typeof selectedMachine === 'string') {
      // If it's a string, split it into an array
      machineValues = selectedMachine.split(',');
    } else {
      // Handle case when selectedMachine is not a string or array
      machineValues = [selectedMachine];
    }

    // If there are multiple values, show the dropdown
    if (machineValues.length > 1) {
      this.showMachineDropdown = true;
      this.sapForm.patchValue({
        coltMachine: machineValues[0] // Set default value as the first one
      });
      this.machineValues = machineValues; // Store all available machine values for the dropdown
    } else {
      // If only one value, directly set it in the form control
      this.showMachineDropdown = false;
      this.sapForm.patchValue({
        coltMachine: machineValues[0] // Set the value directly in coltMachine
      });
    }
  }




  onSubmit() {
    this.isLoading = true;

    if (this.sapForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Please Fill All The Required Fields' });
      this.isLoading = false;
      return;
    }

    // Extract part name correctly from the form
    const selectedPartName = this.sapForm.value.coltPartName;

    if (!selectedPartName) {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Part Name is required' });
      this.isLoading = false;
      return;
    }

    const data = {
      triggerTime: null, // Current time
      coltPartName: selectedPartName, // Send the selected part name directly
      coltPlant: this.sapForm.value.coltPlant,
      colaQuantity: this.sapForm.value.colaQuantity,
      coltMachine: this.sapForm.value.coltMachine,
      coltBatch: this.sapForm.value.coltBatch
    };

    console.log('Data to be sent:', data);

    this.sap.submitEntry(data).subscribe(
      (response) => {
        this.showMachineDropdown = false;
        console.log('Data sent successfully', response);
        this.isLoading = false;

        // Reset the form while keeping the default plant code
        this.sapForm.reset({
          coltPartName: '', // Reset the dropdown value
          coltPlant: '1004', // Set default plant value again
          colaQuantity: '',
          coltMachine: '',
          coltBatch: ''
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Sent Successfully' });
      },
      (error) => {
        this.isLoading = false;

        // Reset the form even in case of error
        this.sapForm.reset({
          coltPartName: '', // Reset the dropdown value
          coltPlant: '1004', // Set default plant value again
          colaQuantity: '',
          coltMachine: '',
          coltBatch: ''
        });

        console.error('Error sending data', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Sending Data' });
      }
    );
  }



}
