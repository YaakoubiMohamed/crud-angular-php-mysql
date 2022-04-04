import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from  './user';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://127.0.0.1/crud";

  constructor(private httpClient: HttpClient) {}

  readUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  readUser(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.PHP_API_SERVER}/api/readone.php/?id=${id}`);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.PHP_API_SERVER}/api/create.php`, user);
  }

  updateUser(user: User,id: number){
    return this.httpClient.put<User>(`${this.PHP_API_SERVER}/api/update.php/?id=${id}`, user);   
  }

  deleteUser(id: number){
    return this.httpClient.delete<User>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }
}
