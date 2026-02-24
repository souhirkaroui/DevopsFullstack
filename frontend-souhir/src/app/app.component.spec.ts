// src/app/app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CustomerService, Customer } from './customer.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Mock correctement typé pour CustomerService
const customerServiceMock = {
  getCustomers: () => of([] as Customer[]),
  addCustomer: (customer: Customer) => of(customer), // retourne un Customer
  deleteCustomer: (id: number) => of(void 0)        // retourne void
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // nécessaire pour [(ngModel)] et ngForm
      declarations: [AppComponent],
      providers: [
        { provide: CustomerService, useValue: customerServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent)
      .toContain('frontend app is running!');
  });
});
