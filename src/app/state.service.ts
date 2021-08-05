import { EventEmitter, Injectable } from '@angular/core';
import { Device } from './entities/device';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public device: Device;

  public testResults = new EventEmitter<string>();

  constructor() { }
}
