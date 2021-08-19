import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomsComponent } from './booms.component';

describe('BoomsComponent', () => {
  let component: BoomsComponent;
  let fixture: ComponentFixture<BoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
