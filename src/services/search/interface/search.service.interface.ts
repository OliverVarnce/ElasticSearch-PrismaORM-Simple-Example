export interface SearchServiceInterface<T> {
  insertIndex(bulkData: T): Promise<T>;
  updateIndex(updateData: T): Promise<T>;
  deleteIndex(bulkData: T): Promise<T>;
  searchIndex(searchData: T): Promise<T>;
  deleteDocument(indexData: T): Promise<T>;
}
