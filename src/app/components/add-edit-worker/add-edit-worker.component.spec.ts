import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkerComponent } from './add-edit-worker.component';

describe('AddEditWorkerComponent', () => {
  let component: AddEditWorkerComponent;
  let fixture: ComponentFixture<AddEditWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorkerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
