import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  UserForm!: FormGroup; // type validation form
  typesubmit!: boolean;
  id!: number;

  constructor(private actRouter:ActivatedRoute, public formBuilder: FormBuilder, private apiService: ApiService,
    private router: Router) { }
  
  

  ngOnInit() {
    this.id = parseInt(this.actRouter.snapshot.paramMap.get("id")||'');

    this.UserForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
    this.typesubmit = false;
    this.getUser(this.id);
  }


  getUser(id:number){
    this.apiService.readUser(id).subscribe(data=> {
      console.log(data);
      this.UserForm.setValue({
        nom:data.nom,
        prenom:data.prenom,
        email:data.email,
        telephone:data.telephone,
      });
    })
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
    
    if (this.UserForm.invalid) {
      return;
    }
    this.apiService.updateUser(this.UserForm.value,this.id).subscribe(data => {
      this.router.navigate(['/']);
    });
  }

}
