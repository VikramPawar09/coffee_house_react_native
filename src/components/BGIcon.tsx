import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconProps {
    name: string;
    color: string;
    size: number;
    bgColor: string;
}

const BGIcon: React.FC<BGIconProps> = (props) => {
    return (
        <View style={[styles.IconBG, { backgroundColor: props?.bgColor }]}>
            <CustomIcon name={props?.name} color={props?.color} size={props?.size} />
        </View>
    )
}

export default BGIcon

const styles = StyleSheet.create({
    IconBG: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_8
    }
})