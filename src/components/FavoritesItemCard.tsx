import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface FavoritesItemCardProps {
    itemData: ProductDataType;
    toggleFavoriteItem: (favourite: boolean, type: string, id: string) => void;
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
    itemData,
    toggleFavoriteItem,
}) => {
    return (
        <View style={styles.CardContainer}>
            <ImageBackgroundInfo  {...itemData}
                enableBackHandle={false}
                toggleFavorite={toggleFavoriteItem} />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.ContainerLinearGradient}>
                <Text style={styles.DescriptionTitle}>Description</Text>
                <Text style={styles.DescriptionText}>{itemData.description}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden'
    },
    ContainerLinearGradient: {
        gap: SPACING.space_10,
        padding: SPACING.space_20
    },
    DescriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex
    },
    DescriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex
    },
});

export default FavoritesItemCard;
