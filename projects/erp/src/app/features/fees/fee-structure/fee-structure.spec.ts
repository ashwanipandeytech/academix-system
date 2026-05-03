import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStructureComponent } from './fee-structure';

describe('FeeStructureComponent', () => {
  let component: FeeStructureComponent;
  let fixture: ComponentFixture<FeeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeStructureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeeStructureComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
