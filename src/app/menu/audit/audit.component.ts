import { Component } from '@angular/core';

import { AuditDTO } from 'src/app/models/auditDTO';

import { AuditService } from 'src/app/services/audit/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent {
  auditList: AuditDTO[];
  isLoading: boolean;

  constructor(private auditService: AuditService) { }

  ngOnInit() {
    this.isLoading = true;
    // this.dummyService();
    this.getAuditLogs();
  }

  private getAuditLogs() {
    this.auditService.getAuditLog()
      .subscribe(
        {
          next: (res) => {
            this.isLoading = false;
            this.auditList = res;
          },
          error: (err) => console.error('Error al cargar los registros de auditoría', err)
        }
      );
  }

  dummyService() {
    // Funcionalidad Dummy
    this.auditService.getAuditEntries()
      .then(res => this.auditList = res)
      .catch(err => console.error('Error al cargar registros', err));
  }
}
