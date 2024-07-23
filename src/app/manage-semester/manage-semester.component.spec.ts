import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSemesterComponent } from './manage-semester.component';

describe('ManageSemesterComponent', () => {
  let component: ManageSemesterComponent;
  let fixture: ComponentFixture<ManageSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSemesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
