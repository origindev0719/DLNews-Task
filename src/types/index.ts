export interface PaginationSetting {
  currentPage: number;
  pagePer: number;
  totalItems: number;
  totalPage: number;
}

export interface PaginationProps {
  setting: PaginationSetting;
  handlePagination: any;
}
