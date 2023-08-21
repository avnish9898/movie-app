import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataFetchService } from '../data-fetch.service';
@Injectable({ providedIn: 'root' })
export class CatagoriesService {
  typeData = new BehaviorSubject<any>(null);
}
