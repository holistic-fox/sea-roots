import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMapDisplayComponent } from './global-map-display.component';

describe('GlobalMapDisplayComponent', () => {
  let component: GlobalMapDisplayComponent;
  let fixture: ComponentFixture<GlobalMapDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalMapDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalMapDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
