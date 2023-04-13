import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ProfileComponent } from './profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuHarness } from '@angular/material/menu/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('MenuHarness', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, NoopAnimationsModule],
      declarations: [ProfileComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    it('should load all menu harnesses', async () => {
      const menus = await loader.getAllHarnesses(MatMenuHarness);
      expect(menus.length).toBe(1);
    });
  });
});
