import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useStore } from '../store/store';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({ navigation, route }: any) => {
    const ItemOfIndex = useStore((state: AppState) =>
        route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
    )[route.params.index];

    const [fullDescription, setFullDescription] = useState<boolean>(false);
    const [price, setPrice] = useState<Price>(ItemOfIndex.prices[0]);

    const addToFavoriteList = useStore(
        (state: AppState) => state.addToFavoriteList,
    );
    const deleteFromFavoriteList = useStore(
        (state: AppState) => state.deleteFromFavoriteList,
    );
    const addToCart = useStore((state: AppState) => state.addToCart);
    const calculateCartPrice = useStore(
        (state: AppState) => state.calculateCartPrice,
    );
    const backHandler = () => {
        navigation.pop();
    };

    const toggleFavorite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    const addToCartHandler = (productData: ProductDataType) => {
        addToCart(productData);
        calculateCartPrice();
        navigation.navigate('Cart');
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <ImageBackgroundInfo
                    {...ItemOfIndex}
                    enableBackHandle={true}
                    backHandler={backHandler}
                    toggleFavorite={toggleFavorite}
                />

                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>Description</Text>
                    {fullDescription ? (
                        <TouchableWithoutFeedback
                            onPress={() => setFullDescription(prev => !prev)}>
                            <Text style={styles.DescriptionText}>
                                {ItemOfIndex?.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => setFullDescription(prev => !prev)}>
                            <Text style={styles.DescriptionText} numberOfLines={3}>
                                {ItemOfIndex?.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    )}
                    <Text style={styles.InfoTitle}>Size</Text>
                    <View style={styles.SizeOuterContainer}>
                        {ItemOfIndex.prices.map((data: Price) => (
                            <TouchableOpacity
                                style={[
                                    styles.SizeBox,
                                    {
                                        borderColor:
                                            data.size == price.size
                                                ? COLORS.primaryOrangeHex
                                                : COLORS.primaryDarkGreyHex,
                                    },
                                ]}
                                key={data.size}
                                onPress={() => setPrice(data)}>
                                <Text
                                    style={[
                                        styles.SizeText,
                                        {
                                            fontSize:
                                                ItemOfIndex.type === 'bean'
                                                    ? FONTSIZE.size_14
                                                    : FONTSIZE.size_16,
                                            color:
                                                data.size == price.size
                                                    ? COLORS.primaryOrangeHex
                                                    : COLORS.secondaryLightGreyHex,
                                        },
                                    ]}>
                                    {data.size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <PaymentFooter
                    price={price}
                    buttonPressHandler={() => {
                        addToCartHandler({
                            ...ItemOfIndex,
                            prices: [price],
                        });
                    }}
                    buttonTitle="Add to Cart"
                />
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
        justifyContent: 'space-between',
    },
    FooterInfoArea: {
        padding: SPACING.space_20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,
    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
});
export default DetailsScreen;
