// src/app/app.component.spec.ts
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CustomerService, Customer } from './customer.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

// Mock typé pour CustomerService avec Observable correct
const customerServiceMock: Partial<CustomerService> = {
  getCustomers: () => of([] as Customer[]),            // retourne un tableau vide
  addCustomer: (customer: Customer) => of({ ...customer }), // retourne un Customer
  deleteCustomer: (id: number) => of(void 0)          // retourne void
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule   // 👈 AJOUT ICI
      ],
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

  // Nouveau test optionnel pour s'assurer que le service charge les customers
  it('should load customers from the service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.customers).toEqual([]); // le mock retourne un tableau vide
  });
});
