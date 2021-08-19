import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMemberComponent } from './sidebar-member.component';

describe('SidebarMemberComponent', () => {
  let component: SidebarMemberComponent;
  let fixture: ComponentFixture<SidebarMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
