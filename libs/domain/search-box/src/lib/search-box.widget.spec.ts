import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxWidget } from './search-box.widget';

describe('SearchBoxWidget', () => {
  let component: SearchBoxWidget;
  let fixture: ComponentFixture<SearchBoxWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBoxWidget ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
