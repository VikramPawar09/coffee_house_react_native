import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: ProductDataType[]) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
            temp[data[i].name]++;
        }
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
};

const getCoffeeList = (category: string, data: ProductDataType[]) => {
    if (category == 'All') {
        return data;
    } else {
        return data.filter((item: ProductDataType) => item.name == category);
    }
};

const HomeScreen = ({ navigation }: any) => {
    const CoffeeList = useStore((state: AppState) => state.CoffeeList);
    const BeanList = useStore((state: AppState) => state.BeanList);
    const addToCart = useStore((state: AppState) => state.addToCart);
    const calculateCartPrice = useStore((state: AppState) => state.calculateCartPrice);

    const [categories, _setCategories] = useState(
        getCategoriesFromData(CoffeeList),
    );
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedCoffee, setSortedCoffee] = useState(
        getCoffeeList(categoryIndex.category, CoffeeList),
    );

    const listRef: any = useRef<FlatList>();
    const tabBarHeight = useBottomTabBarHeight();

    const searchCofee = (search: string) => {
        if (search?.length) {
            listRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedCoffee([
                ...CoffeeList.filter((item: ProductDataType) =>
                    item?.name?.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    const resetSearchCoffee = () => {
        listRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedCoffee([...CoffeeList]);
        setSearchText('');
    };


    const coffeeCardAddToCart = (productData: ProductDataType) => {
        addToCart(productData);
        calculateCartPrice();
        ToastAndroid.showWithGravity(`${productData.name} is Added to Cart.`, ToastAndroid.SHORT, ToastAndroid.CENTER)
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollviewFlex}>
                {/*App Header */}
                <HeaderBar />

                <Text style={styles.ScreenTitle}>
                    Find the best{'\n'}coffee for you
                </Text>

                {/*Search Input*/}
                <View style={styles.InputContainerComponent}>
                    <TouchableOpacity
                        onPress={() => {
                            searchCofee(searchText);
                        }}>
                        <CustomIcon
                            name="search"
                            size={FONTSIZE.size_18}
                            color={
                                searchText.length > 0
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryLightGreyHex
                            }
                            style={styles.InputIcon}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Find Your Coffee..."
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            searchCofee(text);
                        }}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.TextInputContainer}
                    />
                    {searchText?.length ? (
                        <TouchableOpacity onPress={resetSearchCoffee}>
                            <CustomIcon
                                style={styles.InputIcon}
                                name="close"
                                size={FONTSIZE.size_16}
                                color={COLORS.primaryLightGreyHex}
                            />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>

                {/* Category Scroller */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.CategoryScrollViewStyle}>
                    {categories.map((data, index) => (
                        <View
                            key={index.toString()}
                            style={styles.CategoryScrollViewContainer}>
                            <TouchableOpacity
                                style={styles.CategoryScrollViewItem}
                                onPress={() => {
                                    listRef?.current?.scrollToOffset({
                                        animated: true,
                                        offset: 0,
                                    });
                                    setCategoryIndex({ index: index, category: categories[index] });
                                    setSortedCoffee(getCoffeeList(categories[index], CoffeeList));
                                }}>
                                <Text
                                    style={[
                                        styles.CategoryText,
                                        categoryIndex.index == index
                                            ? { color: COLORS.primaryOrangeHex }
                                            : {},
                                    ]}>
                                    {data}
                                </Text>
                                {categoryIndex.index == index ? (
                                    <View style={styles.ActiveCategory} />
                                ) : (
                                    <></>
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Coffee Flatlist */}
                <FlatList
                    ref={listRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.EmptyListContainer}>
                            <Text style={styles.CategoryText}>No Coffee Available</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={sortedCoffee}
                    contentContainerStyle={styles.FlatlistContainer}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.push('Details', {
                                        index: item.index,
                                        id: item.id,
                                        type: item.type,
                                    });
                                }}>
                                <CoffeeCard
                                    coffeeData={item}
                                    buttonPressHandler={coffeeCardAddToCart}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />

                {/* Beans Flatlist */}
                <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BeanList}
                    contentContainerStyle={[
                        styles.FlatlistContainer,
                        { marginBottom: tabBarHeight },
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.push('Details', {
                                        index: item.index,
                                        id: item.id,
                                        type: item.type,
                                    });
                                }}>
                                <CoffeeCard
                                    coffeeData={item}
                                    buttonPressHandler={coffeeCardAddToCart}
                                />
                            </TouchableOpacity>
                        );
                    }}
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
    ScrollviewFlex: {
        flexGrow: 1,
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    InputContainerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatlistContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
});
export default HomeScreen;
