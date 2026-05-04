import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherListComponent } from './teacher-list';

describe('TeacherListComponent', () => {
  let component: TeacherListComponent;
  let fixture: ComponentFixture<TeacherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
