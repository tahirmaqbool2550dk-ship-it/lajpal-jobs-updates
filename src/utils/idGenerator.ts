/**
 * Generates unique Request IDs like REQ-20260929-001
 */
export function generateRequestId(existingCount: number = 0): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const seq = String(existingCount + 1).padStart(3, '0');
  const randomSuffix = Math.floor(10 + Math.random() * 90);
  return `REQ-${dateStr}-${seq}-${randomSuffix}`;
}
