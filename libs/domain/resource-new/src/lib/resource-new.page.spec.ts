import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNewPage } from './resource-new.page';

describe('ResourceNewPage', () => {
  let component: ResourceNewPage;
  let fixture: ComponentFixture<ResourceNewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceNewPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
