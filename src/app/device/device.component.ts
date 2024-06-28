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

  async ngOnInit() { // Use ngOnInit lifecycle hook
    try {
      this.deviceInfo = await this.device.getInfo();
    } catch (error) {
      console.error('Error getting device info:', error);
    }
  }  
}
