import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {
  @Input() device: any; // Assuming 'device' is an object with a 'name' property
  deviceInfo: any; // To store the info from getInfo()  
  isConnected = false; // Track connection state
  hasConnectFeature = false; // Flag to check if 'connected' member exists


  async ngOnInit() { // Use ngOnInit lifecycle hook
    try {
      this.deviceInfo = await this.device.getInfo();
      this.hasConnectFeature = typeof this.device.connected !== 'undefined';

      if (this.hasConnectFeature) {
        this.device.onconnect = this.onConnect;
        this.device.onconnect = this.onDisconnect;
        this.isConnected = this.device.connected;
      }      
    } catch (error) {
      console.error('Error getting device info:', error);
    }
  }  

  onConnect() {
    console.log('[DEBUG] device connect');
    this.isConnected = this.device.connected;
  }

  onDisconnect() {
    console.log('[DEBUG] device disconnect');
    this.isConnected = this.device.connected;
  }  
}
