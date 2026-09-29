/**
 * Centralized date functions for jobs, content expiry and display formatting.
 */

export function parseDateOnly(dateString: string): Date {
  if (!dateString) return new Date();
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    // End of that date for deadline comparisons (23:59:59)
    return new Date(year, month, day, 23, 59, 59, 999);
  }
  return new Date(dateString);
}

/**
 * Returns whether applications are currently open or closed
 */
export function getJobStatus(lastDate: string): 'open' | 'closed' {
  if (!lastDate) return 'closed';
  const deadline = parseDateOnly(lastDate);
  const now = new Date();
  return now.getTime() <= deadline.getTime() ? 'open' : 'closed';
}

/**
 * Returns human-readable days remaining
 * e.g. "10 Days Left", "5 Days Left", "2 Days Left", "1 Day Left", "Last Day", "Applications Closed"
 */
export function getDaysRemaining(lastDate: string): string {
  if (!lastDate) return 'Applications Closed';
  const deadline = parseDateOnly(lastDate);
  const now = new Date();

  const diffMs = deadline.getTime() - now.getTime();
  if (diffMs < 0) {
    return 'Applications Closed';
  }

  // Calculate whole days remaining
  const oneDayMs = 1000 * 60 * 60 * 24;
  const daysLeft = Math.floor(diffMs / oneDayMs);

  if (daysLeft === 0) {
    // Check if within hours on the last day
    const hoursLeft = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));
    return hoursLeft <= 12 ? 'Last Day (Closing Soon)' : 'Last Day';
  }
  if (daysLeft === 1) {
    return '1 Day Left';
  }
  return `${daysLeft} Days Left`;
}

/**
 * Check if a content post with an optional expiry date has expired
 */
export function isPostExpired(expiryDate?: string): boolean {
  if (!expiryDate) return false;
  const deadline = parseDateOnly(expiryDate);
  const now = new Date();
  return now.getTime() > deadline.getTime();
}

/**
 * Formats a YYYY-MM-DD string into "30 Sep 2026" or "September 30, 2026"
 */
export function formatDisplayDate(dateStr: string, format: 'short' | 'long' = 'short'): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (format === 'long') {
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: format === 'long' ? 'long' : 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Get today's date formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
