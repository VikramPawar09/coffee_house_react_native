import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation, route }: any) => {
    const CartList = useStore((state: AppState) => state.CartList);
    const CartPrice = useStore((state: AppState) => state.CartPrice);

    const incrementCartItemQuantity = useStore(
        (state: AppState) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
        (state: AppState) => state.decrementCartItemQuantity,
    );
    const addToOrderHistoryListFromCart = useStore(
        (state: AppState) => state.addToOrderHistoryListFromCart,
    );

    const calculateCartPrice = useStore(
        (state: AppState) => state.calculateCartPrice,
    );

    const tabBarHeight = useBottomTabBarHeight();

    const buttonPressHandler = () => {
        navigation.push('Payment', { amount: CartPrice });
    };

    const incrementCartItemQuantityHandler = (id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    const decrementCartItemQuantityHandler = (id: string, size: string) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Cart" />
                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data: ProductDataType) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: data.index,
                                                id: data.id,
                                                type: data.type,
                                            });
                                        }}
                                        key={data.id}>
                                        <CartItem
                                            itemData={data}
                                            incrementCartItemQuantityHandler={
                                                incrementCartItemQuantityHandler
                                            }
                                            decrementCartItemQuantityHandler={
                                                decrementCartItemQuantityHandler
                                            }
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    {CartList.length !== 0 ? (
                        <PaymentFooter
                            buttonPressHandler={buttonPressHandler}
                            buttonTitle="Pay"
                            price={{ price: CartPrice, currency: '$' }}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: { flex: 1 },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
});

export default CartScreen;
