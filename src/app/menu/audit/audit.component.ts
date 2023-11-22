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

  constructor(private auditService: AuditService) { }

  ngOnInit() {
    this.auditService.getAuditEntries()
      .then(res => this.auditList = res)
      .catch(err => console.error('Error al cargar registros', err));
  }
}
