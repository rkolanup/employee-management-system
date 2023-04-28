import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Employees } from '../employee-list/employee-list.model';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss']
})

export class EditEmployeeDialogComponent implements OnInit {
  employeeForm!: FormGroup;
  @Input() employee: Employees | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
   @Optional() @Inject(MAT_DIALOG_DATA) public data: { action: string, departmentList: any, info: Employees },
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    if(this.data.action === 'Add'){
      this.employeeForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        department: ['', Validators.required],
      });
    } else {
      this.employeeForm = this.fb.group({
        id: [this.data.info.id],
        firstName: [this.data.info.firstName, Validators.required],
        lastName: [this.data.info.lastName, Validators.required],
        email: [this.data.info.email, [Validators.required, Validators.email]],
        department: [this.data.info.department.id, Validators.required],
      });
    }
    console.log(this.employeeForm.value)
  }
   
  onSave() {
    if (this.employeeForm.valid) {
      const employee: Employees = {
        id: this.employeeForm.value.id,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        email: this.employeeForm.value.email,
        department: {
          id: this.employeeForm.value.department        
        }
      };
      this.dialogRef.close(employee);
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
