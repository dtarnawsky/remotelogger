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
import { StateService } from '../state.service';
import { LogAction } from './logaction';

@Component({
  selector: 'app-loglist',
  templateUrl: './loglist.component.html',
  styleUrls: ['./loglist.component.scss'],
})
export class LoglistComponent implements OnInit, OnDestroy {
  @Input() actions: EventEmitter<LogAction>;

  public entries: Array<LogEntry> = [];

  get deviceIdentifier(): string {
    return this.deviceId;
  }

  @Input()
  set deviceIdentifier(deviceIdentifier: string) {
    this.deviceId = deviceIdentifier;
    this.update();
  }

  private deviceId: string;
  private subscription: Subscription;
  private timer: any;

  constructor(private apiService: ApiService, private stateService: StateService) { }

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
      this.entries.push({
        message:
          'Entries will appear here where you have console.log and similar calls in your app.',
        logLevel: 'info',
        created: undefined,
        codeRef: 'none',
        id: '123',
      });
      return;
    }
    if (this.entries.length === 0) {
      this.load();
    }
    const entries = await this.apiService.getLogEntries(this.deviceIdentifier);
    for (const entry of entries) {
      const product = '@ion-logger:';
      if (entry.message.startsWith(product)) {
        this.stateService.testResults.emit(entry.message.substr(product.length, entry.message.length - product.length));
      } else {
        this.entries.push(entry);
      }
    }    
    this.save();
  }

  load() {
    try {
      this.entries = JSON.parse(sessionStorage['log-' + this.deviceIdentifier]);
    } catch { }
  }

  save() {
    sessionStorage['log-' + this.deviceIdentifier] = JSON.stringify(
      this.entries
    );
  }
}
