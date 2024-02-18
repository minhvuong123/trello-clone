import { ACTION, Auditlog } from "@prisma/client";

export const generateLogMessage = (log: Auditlog) => {
  const { action, entityTitle, entityType } = log;

  switch(action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `unknow action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
}