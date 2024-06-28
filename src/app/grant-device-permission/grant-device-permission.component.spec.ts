import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantDevicePermissionComponent } from './grant-device-permission.component';

describe('GrantDevicePermissionComponent', () => {
  let component: GrantDevicePermissionComponent;
  let fixture: ComponentFixture<GrantDevicePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantDevicePermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantDevicePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
