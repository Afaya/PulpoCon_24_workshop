import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelEditionComponent } from './travel-edition.component';

describe('TravelEditionComponent', () => {
  let component: TravelEditionComponent;
  let fixture: ComponentFixture<TravelEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
