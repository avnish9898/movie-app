import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class TypeService implements OnInit {
  changeData = new BehaviorSubject<any>(null);
  typeData = new BehaviorSubject<any>(null);

  ngOnInit(): void {}
}
