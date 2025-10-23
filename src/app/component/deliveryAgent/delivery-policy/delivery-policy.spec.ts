import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPolicy } from './delivery-policy';

describe('DeliveryPolicy', () => {
  let component: DeliveryPolicy;
  let fixture: ComponentFixture<DeliveryPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
