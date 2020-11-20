import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CrudService } from '../../services/CRUD/crud.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})

export class EditStudentComponent implements OnInit {
  loading = false;
  spinning = false;
  editForm: FormGroup;

  constructor(private crudService: CrudService, private fb: FormBuilder, private actRoute: ActivatedRoute, private location: Location, 
    private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    if(!sessionStorage.getItem('clark')) {
      this.router.navigate(['/dashboard/view-students']);
    } else {
      this.updateForm();
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.crudService.GetStudent(id).valueChanges()
      .subscribe(data => {
        this.editForm.setValue(data);
      });
    }
  }

  updateForm() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)] ],
      lastName: ['', [Validators.required, Validators.minLength(3)] ],
      enrollmentId: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)] ],
      collegeName: ['', [Validators.required] ],
      branch: ['', [Validators.required] ],
      semester: ['', [Validators.required] ]
    });
  }

  goBack() {
    this.spinning = true;
    sessionStorage.removeItem('clark');
    setTimeout(() => {
      this.location.back();
    }, 2000);
  }

  updateStudentData() {
    this.loading = true;
    this.crudService.UpdateStudent(this.editForm.value);
    sessionStorage.removeItem('clark');
    setTimeout(() => {
      this.router.navigate(['/dashboard/view-students']);
      this.toastr.success(this.editForm.controls['firstName'].value + ' updated Successfully!');
    }, 2000);
  }
}