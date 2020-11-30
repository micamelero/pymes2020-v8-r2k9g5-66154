import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Personas } from "../models/personas";

@Injectable()
export class PersonasService {
resourceUrl: string;
  constructor(private httpClient: HttpClient) {
  this.resourceUrl = "https://pav2.azurewebsites.net/api/personas";
  }
  get():any { 
    return this.httpClient.get(this.resourceUrl);
  
  }
  getById(Id: number) { 
    return this.httpClient.get(this.resourceUrl + Id);
     
  }
  post(obj: Personas) {
    return this.httpClient.post(this.resourceUrl, obj);
   

  }

  put(Id: number, obj: Personas) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
    
  }

}

