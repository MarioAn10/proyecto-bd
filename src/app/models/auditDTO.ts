export interface AuditDTO {
    id?: string | number;
    user?: string;
    action?: string;
    dateChange?: string;
    table?: string;
    previousValue?: string | null;
    newValue?: string | null
}

