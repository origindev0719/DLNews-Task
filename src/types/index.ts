export interface CategoryProps {
  isLoading: boolean;
  categories: {
    data: any[];
  };
  category_id: string;
  error: string;
  pending: boolean;
  completed: boolean;
  toggle: boolean;
}

export interface ItemProps {
  isLoading: boolean;
  item: {
    image: string;
    name: string;
    like_count: number;
    comment_count: number;
    description: string;
    price: number;
    shipping_fee: string;
  };
  error: string;
  pending: boolean;
  completed: boolean;
}

export interface ItemListProps {
  isLoading: boolean;
  items: {
    data: any[];
  };
  category_id: string;
  error: string;
  pending: boolean;
  completed: boolean;
}

export interface HeaderStateProps {
  isLoading: boolean;
  categories: {
    data: any[];
  };
  keyword: string;
  category_id: null | string;
  error: string;
  pending: boolean;
  completed: boolean;
  toggle: boolean;
}

export interface HeaderProps {
  search: boolean;
}
