import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private httpClient: HttpClient) { }

  getThings() {
    return this.httpClient.get('');
  }
}
