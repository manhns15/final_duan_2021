import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMemberComponent } from './navbar-member.component';

describe('NavbarMemberComponent', () => {
  let component: NavbarMemberComponent;
  let fixture: ComponentFixture<NavbarMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
