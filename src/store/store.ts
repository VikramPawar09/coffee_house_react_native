import {create, StateCreator} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

const myMiddlewares = <T extends AppState>(
  config: StateCreator<T, [], []>,
): StateCreator<T, [], [['zustand/persist', unknown]]> =>
  persist(config, {
    name: 'coffee-app',
    storage: createJSONStorage(() => AsyncStorage),
  });

export const useStore = create<AppState>()(
  myMiddlewares(set => ({
    CoffeeList: CoffeeData,
    BeanList: BeansData,
    CartPrice: '0',
    FavoritesList: [],
    CartList: [],
    OrderHistoryList: [],

    addToCart: (cartItem: ProductDataType) =>
      set(
        produce((state: AppState) => {
          let found = false;
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == cartItem.id) {
              found = true;
              let sizeFound = false;
              for (let j = 0; j < state?.CartList[i]?.prices?.length; j++) {
                if (
                  state.CartList[i].prices[j].size === cartItem.prices[0].size
                ) {
                  sizeFound = true;
                  state.CartList[i].prices[j].quantity++;
                  break;
                }
              }
              if (!sizeFound) {
                state.CartList[i].prices.push(cartItem.prices[0]);
              }

              state.CartList[i].prices.sort((a: Price, b: Price) => {
                if (a.size === b.size) return 0;
                return a.size > b.size ? -1 : 1;
              });
              break;
            }
          }
          if (!found) {
            state.CartList.push(cartItem);
          }
        }),
      ),

    calculateCartPrice: () =>
      set(
        produce((state: AppState) => {
          let totalPrice = 0;
          for (let i = 0; i < state.CartList.length; i++) {
            let tempPrice = 0;
            for (let j = 0; j < state.CartList[i].prices.length; j++) {
              tempPrice =
                tempPrice +
                parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity;
            }
            // adding new property in CartList
            state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
            totalPrice += tempPrice;
          }
          state.CartPrice = totalPrice.toFixed(2).toString();
        }),
      ),

    addToFavoriteList: (type: string, id: string) =>
      set(
        produce((state: AppState) => {
          if (type === 'Coffee') {
            for (let i = 0; i < state.CoffeeList.length; i++) {
              if (
                state.CoffeeList[i].id === id &&
                !state.CoffeeList[i].favourite
              ) {
                state.CoffeeList[i].favourite = true;
                state.FavoritesList.unshift(state.CoffeeList[i]);
                break;
              }
            }
          } else if (type === 'Bean') {
            for (let i = 0; i < state.BeanList.length; i++) {
              if (state.BeanList[i].id === id && !state.BeanList[i].favourite) {
                state.BeanList[i].favourite = true;
                state.FavoritesList.unshift(state.BeanList[i]);
                break;
              }
            }
          }
        }),
      ),

    deleteFromFavoriteList: (type: string, id: string) =>
      set(
        produce((state: AppState) => {
          if (type === 'Coffee') {
            for (let i = 0; i < state.CoffeeList.length; i++) {
              if (
                state.CoffeeList[i].id === id &&
                state.CoffeeList[i].favourite
              ) {
                state.CoffeeList[i].favourite = false;
                break;
              }
            }
          } else if (type === 'Beans') {
            for (let i = 0; i < state.BeanList.length; i++) {
              if (state.BeanList[i].id === id && state.BeanList[i].favourite) {
                state.BeanList[i].favourite = false;
                break;
              }
            }
          }

          let spliceIndex = -1;
          for (let i = 0; i < state.FavoritesList.length; i++) {
            if (state.FavoritesList[i].id === id) {
              spliceIndex = i;
              break;
            }
          }
          state.FavoritesList.splice(spliceIndex, 1);
        }),
      ),

    incrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce((state: AppState) => {
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id === id) {
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[j].size === size) {
                  state.CartList[i].prices[j].quantity++;
                  break;
                }
              }
            }
          }
        }),
      ),

    decrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce((state: AppState) => {
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id === id) {
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[j].size === size) {
                  if (state.CartList[i].prices.length > 1) {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--;
                    } else {
                      state.CartList[i].prices.splice(j, 1);
                    }
                  } else {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--;
                    } else {
                      state.CartList.splice(i, 1);
                    }
                  }
                  break;
                }
              }
            }
          }
        }),
      ),

    addToOrderHistoryListFromCart: () =>
      set(
        produce((state: AppState) => {
          let temp = state.CartList.reduce(
            (accumulator: number, currentValue: any) =>
              accumulator + parseFloat(currentValue.ItemPrice),
            0,
          );

          if (state.OrderHistoryList.length > 0) {
            state.OrderHistoryList.unshift({
              OrderDate:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
              CartList: state.CartList,
              CartListPrice: temp.toFixed(2).toString(),
            });
          } else {
            state.OrderHistoryList.push({
              OrderDate:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
              CartList: state.CartList,
              CartListPrice: temp.toFixed(2).toString(),
            });
          }
          state.CartList = [];
        }),
      ),
  })),
);
