import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFolderComponent } from './custom-folder.component';

describe('CustomFolderComponent', () => {
  let component: CustomFolderComponent;
  let fixture: ComponentFixture<CustomFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
