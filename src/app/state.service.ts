import { Injectable } from '@angular/core';
import { Device } from './entities/device';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public device: Device;

  constructor() { }
}
