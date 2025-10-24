import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRestaurantsChart } from './top-restaurants-chart';

describe('TopRestaurantsChart', () => {
  let component: TopRestaurantsChart;
  let fixture: ComponentFixture<TopRestaurantsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRestaurantsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRestaurantsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
