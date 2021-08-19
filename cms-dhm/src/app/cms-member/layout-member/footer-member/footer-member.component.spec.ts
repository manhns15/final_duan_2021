import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMemberComponent } from './footer-member.component';

describe('FooterMemberComponent', () => {
  let component: FooterMemberComponent;
  let fixture: ComponentFixture<FooterMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
