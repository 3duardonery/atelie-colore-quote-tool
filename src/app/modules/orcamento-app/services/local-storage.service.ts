import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(name: string): any {
    return JSON.parse(localStorage.getItem(name));
  }

  saveItem(name: string, object: any): void {
    localStorage.removeItem(name);

    localStorage.setItem(name, JSON.stringify(object));
  }
}
