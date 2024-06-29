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
        this.device.onconnect = this.onConnect;
        this.device.ondisconnect = this.onDisconnect;
        this.isConnected = this.device.connected;
      }
    } catch (error) {
      console.error('Error getting device info:', error);
    }
  }

  updateConnectState() {
    this.isConnected = this.device.connected;
    // Manuall trigger change detection because this might be called by
    // asynchronous operations like as promise or a timeout.
    this.cdRef.detectChanges();
  }

  onConnect =
      () => {
        console.log('[DEBUG] device connect');
        this.updateConnectState();
      }

  onDisconnect = () => {
    console.log('[DEBUG] device disconnect');
    this.updateConnectState();
  }
}
