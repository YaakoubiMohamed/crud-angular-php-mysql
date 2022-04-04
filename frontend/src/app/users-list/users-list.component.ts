import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users!:  User[];
  selectedUser!:  User ;

  dtOptions: DataTables.Settings = {};
  dtElement!: DataTableDirective;

   // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  isDtInitialized:boolean = false;
  // We use this trigger because fetching the list of produits can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getUsers(true);
  }

  getUsers(trigger: boolean) {
    this.apiService.readUsers().subscribe(data => {
      this.users = data as User[];
        
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next(this.users);
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next(this.users);
      }
        console.log('users',this.users);      
    });
    
  }



  delete(id:number){
    this.apiService.deleteUser(id).subscribe((user: User)=>{
      console.log("User deleted, ", user);
    });
  }

}
