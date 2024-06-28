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

  isUsbSerialDevice(info: any): boolean {
    return info.usbProductId !== undefined && info.usbVendorId !== undefined;
  }

  isBluetoothDevice(info: any): boolean {
    // For testing purpose
    const allowed_uuids = [
      '25e97ff7-24ce-4c4c-8951-f764a708f7b5', // Pixel Bud Pro
    ]
    return info.bluetoothServiceClassId !== undefined && allowed_uuids.includes(info.bluetoothServiceClassId);
  }

  shouldShowDevices(device: any): boolean {
    const info = device.getInfo();
    return this.isUsbSerialDevice(info) || this.isBluetoothDevice(info);
  }

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
    return devices.filter((device: any) => this.shouldShowDevices(device));

  }

  async RefreshDeviceList() {
    console.log('test');
    this.devices = await this.getGrantedDevices();
    this.DeviceListRefreshed.emit();
  }  
}
