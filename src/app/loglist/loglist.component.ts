import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { LogEntry } from '../entities/logentry';
import { LogAction } from './logaction';

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit, OnDestroy {
  @Input() deviceIdentifier: string;
  @Input() actions: EventEmitter<LogAction>;

  public entries: Array<LogEntry> = [];

  private subscription: Subscription;
  private timer: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.update();
    this.subscription = this.actions.subscribe((action: LogAction) => {
      if (action === LogAction.clear) {
        this.entries.splice(0, this.entries.length);
      }
      if (action === LogAction.refresh) {
        this.update();
      }
    });
    this.timer = setInterval(() => {
      this.update();
    }, 5000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  colorFor(logLevel: string) {
    if (logLevel === 'warn') {
      return 'danger';
    }
    return 'primary';
  }

  async update() {
    if (!this.deviceIdentifier) {
      this.entries.splice(0, this.entries.length);
      return;
    }
    const entries = await this.apiService.getLogEntries(this.deviceIdentifier);
    this.entries.push(...entries);
  }
}
