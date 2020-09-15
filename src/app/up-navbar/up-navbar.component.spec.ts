import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpNavbarComponent } from './up-navbar.component';

describe('UpNavbarComponent', () => {
  let component: UpNavbarComponent;
  let fixture: ComponentFixture<UpNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
