import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CustomerService } from './customer.service'; // <-- ajoute ton service si utilisé
import { HttpClientModule } from '@angular/common/http'; // <-- indispensable pour HttpClient

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule // <-- permet l'injection de HttpClient
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        CustomerService // <-- ajoute tous les services utilisés par ton composant
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
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  });
});
