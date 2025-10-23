import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAgentDashboard } from './delivery-agent-dashboard';

describe('DeliveryAgentDashboard', () => {
  let component: DeliveryAgentDashboard;
  let fixture: ComponentFixture<DeliveryAgentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryAgentDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAgentDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
