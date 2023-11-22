import { Injectable } from '@angular/core';

import { environments } from 'src/app/endpoints';
import { HttpClient } from '@angular/common/http';
import { AuditDTO } from 'src/app/models/auditDTO';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private baseUrl = environments.baseUrl

  constructor(private http: HttpClient) { }

  private getAuditData(): AuditDTO[] {
    return [
      {
        id: 1,
        user: 'mmartinezg',
        action: 'delete',
        dateChange: '2023-11-21 20:54:00',
        table: 'Usuario',
        previousValue: 'test',
        newValue: 'test2'
      },
      {
        id: 1,
        user: 'mmartinezg',
        action: 'delete',
        dateChange: '2023-11-21 20:54:00',
        table: 'Usuario',
        previousValue: 'test',
        newValue: 'test2'
      },
      {
        id: 1,
        user: 'mmartinezg',
        action: 'delete',
        dateChange: '2023-11-21 20:54:00',
        table: 'Usuario',
        previousValue: 'test',
        newValue: 'test2'
      },
      {
        id: 1,
        user: 'mmartinezg',
        action: 'delete',
        dateChange: '2023-11-21 20:54:00',
        table: 'Usuario',
        previousValue: 'test',
        newValue: 'test2'
      },
      {
        id: 1,
        user: 'mmartinezg',
        action: 'delete',
        dateChange: '2023-11-21 20:54:00',
        table: 'Usuario',
        previousValue: 'test',
        newValue: 'test2'
      },
    ]
  }

  public getAuditEntries() {
    return Promise.resolve(this.getAuditData());
  }
}
