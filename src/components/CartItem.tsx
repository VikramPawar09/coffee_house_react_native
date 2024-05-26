import {
    Image,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface CartItemProp {
    itemData: ProductDataType;
    incrementCartItemQuantityHandler: (id: string, size: string) => void;
    decrementCartItemQuantityHandler: (id: string, size: string) => void;
}

const CartItem: React.FC<CartItemProp> = ({
    itemData,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}) => {
    return (
        <View>
            {itemData.prices.length !== 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemLinearGradient}>
                    <View style={styles.CartItemRow}>
                        <Image
                            source={itemData.imagelink_square}
                            style={styles.CartItemImage}
                        />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{itemData.name}</Text>
                                <Text style={styles.CartItemSubTitle}>
                                    {itemData.special_ingredient}
                                </Text>
                            </View>

                            <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>
                                    {itemData.roasted}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {itemData.prices.map((data: Price, index: number) => (
                        <View
                            key={index.toString()}
                            style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text
                                        style={[
                                            styles.SizeText,
                                            {
                                                fontSize:
                                                    itemData?.type === 'Bean'
                                                        ? FONTSIZE.size_12
                                                        : FONTSIZE.size_16,
                                            },
                                        ]}>
                                        {data.size}
                                    </Text>
                                </View>
                                <Text style={styles.SizeCurrency}>
                                    {data.currency}
                                    <Text style={styles.SizePrice}> {data.price}</Text>
                                </Text>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() =>
                                        decrementCartItemQuantityHandler(itemData.id, data.size)
                                    }>
                                    <CustomIcon
                                        name={'minus'}
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>
                                        {data.quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() =>
                                        incrementCartItemQuantityHandler(itemData.id, data.size)
                                    }>
                                    <CustomIcon
                                        name={'add'}
                                        color={COLORS.primaryWhiteHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemSingleLinearGradient}>
                    <View>
                        <Image
                            source={itemData.imagelink_square}
                            style={styles.CartItemSingleImage}
                        />
                    </View>
                    <View style={styles.CartItemSingleInfoContainer}>
                        <View>
                            <Text style={styles.CartItemTitle}>{itemData.name}</Text>
                            <Text style={styles.CartItemSubTitle}>
                                {itemData.special_ingredient}
                            </Text>
                        </View>
                        <View style={styles.CartItemSingleSizeValueContainer}>
                            <View style={styles.SizeBox}>
                                <Text
                                    style={[
                                        styles.SizeText,
                                        {
                                            fontSize:
                                                itemData?.type === 'Bean'
                                                    ? FONTSIZE.size_12
                                                    : FONTSIZE.size_16,
                                        },
                                    ]}>
                                    {itemData.prices[0].size}
                                </Text>
                            </View>

                            <Text style={styles.SizeCurrency}>
                                {itemData.prices[0].currency}
                                <Text style={styles.SizePrice}> {itemData.prices[0].price}</Text>
                            </Text>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() =>
                                    decrementCartItemQuantityHandler(itemData.id, itemData.prices[0].size)
                                }>
                                <CustomIcon
                                    name={'minus'}
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>
                                    {itemData.prices[0].quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() =>
                                    incrementCartItemQuantityHandler(itemData.id, itemData.prices[0].size)
                                }>
                                <CustomIcon
                                    name={'add'}
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSubTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: { color: COLORS.primaryWhiteHex },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
});

export default CartItem;
