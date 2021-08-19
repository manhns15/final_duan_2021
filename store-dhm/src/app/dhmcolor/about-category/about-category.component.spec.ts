import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCategoryComponent } from './about-category.component';

describe('AboutCategoryComponent', () => {
  let component: AboutCategoryComponent;
  let fixture: ComponentFixture<AboutCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
