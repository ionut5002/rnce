import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedBlogComponent } from './closed-blog.component';

describe('ClosedBlogComponent', () => {
  let component: ClosedBlogComponent;
  let fixture: ComponentFixture<ClosedBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
