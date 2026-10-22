// src/utils/helpers.js

/**
 * Format currency to Malaysian Ringgit
 */
export function formatMYR(amount) {
  if (amount === null || amount === undefined) return 'RM 0.00';
  return `RM ${Number(amount).toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format ISO datetime string to localized Malaysian date
 */
export function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Check if an open order is delayed (> 3 days old)
 */
export function isOrderDelayed(status, createdDateString) {
  if (status !== 'Open order' || !createdDateString) return false;
  const createdDate = new Date(createdDateString);
  const now = new Date();
  const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);
  return diffInDays > 3;
}

/**
 * Human-readable mapping for Harrisons branch site codes
 */
export const SITE_LABELS = {
  ALL: 'All Sabah Branches',
  KK01: 'Kota Kinabalu (HQ - KK01)',
  SDK02: 'Sandakan (SDK02)',
  TWU03: 'Tawau (TWU03)',
  A10: 'Branch A10',
  B20: 'Branch B20',
  C30: 'Branch C30',
  D40: 'Branch D40',
  E50: 'Branch E50',
};