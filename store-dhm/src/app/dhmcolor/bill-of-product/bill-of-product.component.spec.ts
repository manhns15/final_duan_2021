import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfProductComponent } from './bill-of-product.component';

describe('BillOfProductComponent', () => {
  let component: BillOfProductComponent;
  let fixture: ComponentFixture<BillOfProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillOfProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
