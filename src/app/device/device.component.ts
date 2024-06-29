import {CommonModule, NgIf} from '@angular/common';
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {
  @Input()
  device: any;      // Assuming 'device' is an object with a 'name' property
  deviceInfo: any;  // To store the info from getInfo()
  public isConnected = false;  // Track connection state
  hasConnectFeature = false;   // Flag to check if 'connected' member exists

  constructor(private cdRef: ChangeDetectorRef) {}

  async ngOnInit() {  // Use ngOnInit lifecycle hook
    try {
      this.deviceInfo = await this.device.getInfo();
      this.hasConnectFeature = typeof this.device.connected !== 'undefined';

      if (this.hasConnectFeature) {
        this.device.onconnect = this.onConnect.bind(this);
        this.device.ondisconnect = this.onDisconnect.bind(this);
        this.isConnected = this.device.connected;
      }
    } catch (error) {
      console.error('Error getting device info:', error);
    }
  }

  isUsbSerialDevice(info: any): boolean {
    return info.usbProductId !== undefined && info.usbVendorId !== undefined;
  }

  isBluetoothDevice(info: any): boolean {
    // For testing purpose
    const allowed_uuids = [
      '25e97ff7-24ce-4c4c-8951-f764a708f7b5',  // Pixel Bud Pro
    ];
    return info.bluetoothServiceClassId !== undefined &&
        allowed_uuids.includes(info.bluetoothServiceClassId);
  }

  deviceName() {
    const info = this.device.getInfo();
    if (this.isUsbSerialDevice(info)) {
      return `VendorId(${info.usbVendorId}:ProductId${info.usbProductId})`;
    } else if (this.isBluetoothDevice(info)) {
      return `BluetoothServiceClassId(${info.bluetoothServiceClassId})`;
    } else {
      return 'Unknown Device';
    }
  }

  shouldShowDevices(device: any): boolean {
    const info = device.getInfo();
    return this.isUsbSerialDevice(info) || this.isBluetoothDevice(info);
  }

  updateConnectState() {
    this.isConnected = this.device.connected;
    // Manuall trigger change detection because this might be called by
    // asynchronous operations like as promise or a timeout.
    this.cdRef.detectChanges();
  }

  onConnect() {
    console.log(`[DEBUG] device(${this.deviceName()}) connect`);
    this.updateConnectState();
  }

  onDisconnect() {
    console.log(`[DEBUG] device(${this.deviceName()}) disconnect`);
    this.updateConnectState();
  }
}
