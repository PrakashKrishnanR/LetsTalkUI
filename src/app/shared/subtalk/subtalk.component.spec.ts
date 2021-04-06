import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtalkComponent } from './subtalk.component';

describe('SubtalkComponent', () => {
  let component: SubtalkComponent;
  let fixture: ComponentFixture<SubtalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
