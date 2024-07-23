import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgramComponent } from './manage-program.component';

describe('ManageProgramComponent', () => {
  let component: ManageProgramComponent;
  let fixture: ComponentFixture<ManageProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
