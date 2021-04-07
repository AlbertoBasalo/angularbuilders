import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePage } from './resource.page';

describe('ResourcePage', () => {
  let component: ResourcePage;
  let fixture: ComponentFixture<ResourcePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
