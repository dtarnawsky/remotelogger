import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogEntry } from './entities/logentry';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://remotelogger20210730165210.azurewebsites.net/log/';
  constructor(private http: HttpClient) { }

  async getLogEntries(device: string): Promise<Array<LogEntry>> {
    return this.http.get<Array<LogEntry>>(this.url + device).toPromise();
  }
}
