import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404ViewComponent } from './page404-view.component';

describe('Page404ViewComponent', () => {
  let component: Page404ViewComponent;
  let fixture: ComponentFixture<Page404ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page404ViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page404ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
