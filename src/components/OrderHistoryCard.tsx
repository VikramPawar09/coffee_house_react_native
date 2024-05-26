import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import OrderItemCard from './OrderItemCard';

interface OrderHistoryCardProps {
    navigationHandler: (index: number, id: string, type: string) => void;
    cartListPrice: string;
    cartList: any;
    orderDate: string;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
    navigationHandler,
    cartListPrice,
    cartList,
    orderDate,
}) => {
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View>
                    <Text style={styles.HeaderTitle}>Order Time</Text>
                    <Text style={styles.HeaderSubTitle}>{orderDate}</Text>
                </View>
                <View style={styles.PriceContainer}>
                    <Text style={styles.HeaderTitle}>Total Amount</Text>
                    <Text style={styles.PriceHeader}>$ {cartListPrice}</Text>
                </View>
            </View>

            <View style={styles.ListConatiner}>
                {cartList.map((data: ProductDataType, index: number) => (
                    <TouchableOpacity key={index.toString() + data.id} onPress={() => {
                        navigationHandler(data.index, data.id, data.type)
                    }}>
                        <OrderItemCard itemData={data} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        gap: SPACING.space_10,
    },
    CardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    HeaderSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    PriceContainer: {
        alignItems: 'flex-end',
    },
    PriceHeader: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    ListConatiner: {
        gap: SPACING.space_20,
    },
});

export default OrderHistoryCard;
