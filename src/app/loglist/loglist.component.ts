import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LogEntry } from '../entities/logentry';
import { LogAction } from './logaction';

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit {
  @Input() deviceIdentifier: string;
  @Input() actions: EventEmitter<LogAction>;

  public entries: Array<LogEntry> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.update();
    this.actions.subscribe((action: LogAction) => {
      if (action === LogAction.clear) {
        this.entries.splice(0, this.entries.length);
      }
      if (action === LogAction.refresh) {
        this.update();
      }
    });
    setInterval(() => {
      this.update();
    }, 5000);
  }

  colorFor(logLevel: string) {
    if (logLevel === 'warn') {
      return 'danger';
    }
    return 'primary';
  }

  async update() {
    const entries = await this.apiService.getLogEntries(this.deviceIdentifier);
    this.entries.push(...entries);
  }
}
