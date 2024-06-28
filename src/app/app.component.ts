import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrantDevicePermissionComponent } from './grant-device-permission/grant-device-permission.component';
import { GrantedDeviceListComponent } from './granted-device-list/granted-device-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GrantDevicePermissionComponent, GrantedDeviceListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Output() refreshDevices = new EventEmitter();  
  title = 'WebSerialConnectStateTest';

  refreshTrigger = false;  

  onDevicePermissionGranted() {
    this.refreshTrigger = true; // Trigger the refresh
    // Emit the refreshDevices event to signal the child component
    this.refreshDevices.emit(); 
  }

  onDeviceListRefreshed() {
    this.refreshTrigger = false; // Reset the trigger
  }
  
}
