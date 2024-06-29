// /home/chengweih/repo/WebSerialConnectStateTest/src/app/granted-device-list/granted-device-list.component.ts
import { Component, EventEmitter, Input, Output, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { DeviceComponent } from '../device/device.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-granted-device-list',
  standalone: true,
  imports: [CommonModule, DeviceComponent, NgFor], // Import DeviceComponent
  templateUrl: './granted-device-list.component.html',
  styleUrl: './granted-device-list.component.css'
})
export class GrantedDeviceListComponent implements OnInit, OnChanges {
  @Output() DeviceListRefreshed = new EventEmitter();
  @Input() refreshTrigger = false; // Input to trigger refresh
  devices: any[] = []; // Array to store the devices

  async ngOnInit() {
    this.RefreshDeviceList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['refreshTrigger'] && changes['refreshTrigger'].currentValue) {
      this.RefreshDeviceList();
    }
  }

  async getGrantedDevices(): Promise<any[]> {
    const devices =  await (navigator as any).serial.getPorts();
    return devices.filter((device: any) => DeviceComponent.shouldShowDevices(device));

  }

  async RefreshDeviceList() {
    this.devices = await this.getGrantedDevices();
    this.DeviceListRefreshed.emit();
  }
}
