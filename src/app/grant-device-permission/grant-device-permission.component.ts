import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grant-device-permission',
  standalone: true,
  imports: [],
  templateUrl: './grant-device-permission.component.html',
  styleUrl: './grant-device-permission.component.css'
})
export class GrantDevicePermissionComponent {
  @Output() devicePermissionGranted = new EventEmitter(); // Event emitter

  async grantDevicePermission() {
    const uuids = ['25e97ff7-24ce-4c4c-8951-f764a708f7b5', '3a046f6d-24d2-7655-6534-0d7ecb759709'];    
    try {
      // https://g.co/gemini/share/b581c3831922
      await (navigator as any).serial.requestPort({
        allowedBluetoothServiceClassIds: uuids,
        filters: []
      });
      this.devicePermissionGranted.emit(); // Emit the event      
    } catch (e) {
      console.error('Error requesting port:', e);
      return; // Handle the error appropriately (e.g., show a message to the user)
    }
  }
}
