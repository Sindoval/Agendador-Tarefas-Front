import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalDialog } from './confirm-modal-dialog';

describe('ConfirmModalDialog', () => {
  let component: ConfirmModalDialog;
  let fixture: ComponentFixture<ConfirmModalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
