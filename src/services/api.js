// src/services/api.js

const BASE_URL = 'https://hiring.harrisons.my/api/mock/sales-orders';
const ASSESSMENT_KEY = 'hssb-assessment-mock-2026';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-assessment-key': ASSESSMENT_KEY,
};

/**
 * Fetch paginated sales orders with optional filters and sorting
 * @param {Object} params
 * @param {number} [params.page=1]
 * @param {number} [params.pageSize=25]
 * @param {string} [params.site] - InventSiteId (e.g. KK01, SDK02, TWU03)
 * @param {string} [params.status] - SalesStatus (e.g. 'Open order', 'Invoiced')
 * @param {string} [params.q] - Search query (SalesId, SalesName, etc.)
 * @param {string} [params.sort] - Field to sort by
 * @param {string} [params.order] - 'asc' | 'desc'
 */
export async function getSalesOrders(params = {}) {
  const url = new URL(BASE_URL);

  // Set default pagination
  url.searchParams.set('page', params.page || 1);
  url.searchParams.set('pageSize', params.pageSize || 25);

  // Append optional filters if provided
  if (params.site && params.site !== 'ALL') {
    url.searchParams.set('site', params.site);
  }
  if (params.status && params.status !== 'ALL') {
    url.searchParams.set('status', params.status);
  }
  if (params.q && params.q.trim() !== '') {
    url.searchParams.set('q', params.q.trim());
  }
  if (params.sort) {
    url.searchParams.set('sort', params.sort);
  }
  if (params.order) {
    url.searchParams.set('order', params.order);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch API metadata, valid sites, and valid status facets
 */
export async function getSalesOrdersMeta() {
  const response = await fetch(`${BASE_URL}/meta`, {
    method: 'GET',
    headers: defaultHeaders,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch single order details by SalesId
 * @param {string} salesId
 */
export async function getOrderById(salesId) {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(salesId)}`, {
    method: 'GET',
    headers: defaultHeaders,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order ${salesId}: ${response.status}`);
  }

  return response.json();
}