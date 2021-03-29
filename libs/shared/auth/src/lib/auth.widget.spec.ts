import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWidget } from './auth.widget';

describe('AuthWidget', () => {
  let component: AuthWidget;
  let fixture: ComponentFixture<AuthWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthWidget ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
