import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const value = new Date().valueOf();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test increaseYear method', () => {
    component.increaseYear();
    expect(component.currentDate.valueOf()).toBeGreaterThan(value);
  });

  it('should test increaseMonth method', () => {
    component.increaseMonth();
    expect(component.currentDate.valueOf()).toBeGreaterThan(value);
  });

  it('should test decreaseYear method', () => {
    component.decreaseYear();
    expect(component.currentDate.valueOf()).toBeLessThan(value);
  });

  it('should test decreaseMonth method', () => {
    component.decreaseMonth();
    expect(component.currentDate.valueOf()).toBeLessThan(value);
  });
});
