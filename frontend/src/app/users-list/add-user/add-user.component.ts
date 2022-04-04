import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  UserForm!: FormGroup; // type validation form
  typesubmit!: boolean;

  constructor(public formBuilder: FormBuilder, private apiService: ApiService,
    private router: Router) { }
  
  

  ngOnInit() {

    this.UserForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });


    this.typesubmit = false;
  }


  /**
   * Returns the type validation form
   */
  get type() {
    return this.UserForm.controls;
  }

  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
    console.log(this.UserForm.value);
    if (this.UserForm.invalid) {
      return;
    }
    else{
    this.apiService.createUser(this.UserForm.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['']);
    });
  }
  }
      
      
}
