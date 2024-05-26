interface ProductDataType {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: any;
  imagelink_portrait: any;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
  ItemPrice?: string; // added for calculateCartPrice
}

interface Price {
  size: string;
  price: string;
  currency: string;
  quantity: number;
}

interface OrderHistoryListType {
  OrderDate: string;
  CartList: ProductDataType[];
  CartListPrice: string;
}
interface AppState {
  CoffeeList: ProductDataType[];
  BeanList: ProductDataType[];
  CartPrice: string;
  FavoritesList: ProductDataType[];
  CartList: ProductDataType[];
  OrderHistoryList: OrderHistoryListType[];
  addToCart: (product: ProductDataType) => void;
  calculateCartPrice: () => void;
  addToFavoriteList: (type: string, id: string) => void;
  deleteFromFavoriteList: (type: string, id: string) => void;
  incrementCartItemQuantity: (id: string, size: string) => void;
  decrementCartItemQuantity: (id: string, size: string) => void;
  addToOrderHistoryListFromCart: () => void;
}
