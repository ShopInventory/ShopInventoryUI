import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoriesComponent } from './sub-categories.component';

describe('CategoriesComponent', () => {
  let component: SubCategoriesComponent;
  let fixture: ComponentFixture<SubCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCategoriesComponent]
    });
    fixture = TestBed.createComponent(SubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
