import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from './entities/action';
import { Device } from './entities/device';
import { LogEntry } from './entities/logentry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://remotelogger20210730165210.azurewebsites.net';
  constructor(private http: HttpClient) { }

  async getLogEntries(device: string): Promise<Array<LogEntry>> {
    return this.http.get<Array<LogEntry>>(this.url + '/log/' +device).toPromise();
  }

  async getDevices(): Promise<Array<Device>> {
    return this.http.get<Array<Device>>(this.url + '/devices').toPromise();
  }

  async setActions(device: string, actions: Array<Action>) {
    return this.http.post(this.url + '/actions/' + device, actions).toPromise();
  }
}
