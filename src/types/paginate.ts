export interface Pagination<T> {
  page: number;
  size: number;
  totalItems: number;
  items: T[];
  totalPages: number;
}
