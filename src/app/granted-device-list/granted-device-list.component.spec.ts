import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantedDeviceListComponent } from './granted-device-list.component';

describe('GrantedDeviceListComponent', () => {
  let component: GrantedDeviceListComponent;
  let fixture: ComponentFixture<GrantedDeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantedDeviceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantedDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
