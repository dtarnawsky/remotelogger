import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Device } from '../entities/device';
import { StateService } from '../state.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
  devices: Array<Device>;

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    const devices = await this.apiService.getDevices();
    devices.map(this.processDevice);
    this.devices = devices;
  }

  public setDevice(device: Device) {
    this.stateService.device = device;
  }

  private processDevice(device: Device) {
    // Edge
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
    // (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.62"

    // Safari
    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15
    // (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15

    // Chrome
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
    // (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36

    // Chrome Emulate Device
    // Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36
    // (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30
    // (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
    if (!device.userAgent) {
      device.name = 'Unknown Device';
      return;
    }
    if (device.userAgent.includes('Android')) {
      device.name = 'Android Device';
      return;
    }

    if (device.userAgent.includes('iPhone')) {
      device.name = 'Apple iPhone';
      return;
    }

    if (device.userAgent.includes('Edg/')) {
      device.name = 'Microsoft Edge Browser';
      return;
    }

    if (device.userAgent.includes('Chrome/')) {
      device.name = 'Google Chrome Browser';
      return;
    }

    if (device.userAgent.includes('Safari/')) {
      device.name = 'Apple Safari Browser';
      return;
    }

    device.name = device.userAgent;
  }
}
