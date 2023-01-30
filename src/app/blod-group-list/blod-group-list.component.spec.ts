import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlodGroupListComponent } from './blod-group-list.component';

describe('BlodGroupListComponent', () => {
  let component: BlodGroupListComponent;
  let fixture: ComponentFixture<BlodGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlodGroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlodGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
