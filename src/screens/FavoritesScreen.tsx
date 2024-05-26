import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import PaymentFooter from '../components/PaymentFooter';
import { COLORS, SPACING } from '../theme/theme';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoritesScreen = ({ navigation }: any) => {
    const FavoritesList = useStore((state: AppState) => state.FavoritesList);
    const addToFavoriteList = useStore(
        (state: AppState) => state.addToFavoriteList,
    );
    const deleteFromFavoriteList = useStore(
        (state: AppState) => state.deleteFromFavoriteList,
    );

    const toggleFavorite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    const tabBarHeight = useBottomTabBarHeight();

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Favorites" />
                        {FavoritesList.length == 0 ? (
                            <EmptyListAnimation title={'No Favorites'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {FavoritesList.map((data: ProductDataType) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: data.index,
                                                id: data.id,
                                                type: data.type,
                                            });
                                        }}
                                        key={data.id}>
                                        <FavoritesItemCard itemData={data} toggleFavoriteItem={toggleFavorite} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
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
export default FavoritesScreen;
