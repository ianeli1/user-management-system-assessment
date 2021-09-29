export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface RouterParams {
  /**Stores the page number for the main table */
  page: string;
}
