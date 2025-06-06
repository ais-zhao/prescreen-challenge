
import GridItem from '@/components/GridItem';
import HeaderBar from '@/components/HeaderBar';
import ListHeader from '@/components/ListHeader';
import ListItem from '@/components/ListItem';
import Section from '@/components/Section';
import { useRouter } from 'expo-router';
import { Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { SectionGrid, SectionGridRenderItemInfo } from 'react-native-super-grid';
import { HomeData, IHomeItem, SectionType } from './../../mock/HomeData';
const HomeScreen = () => {
    const keyExtractor = (item: IHomeItem, index: number) => {
        return item.id.toString();
    }

    const renderItem = ({ item, index, section }: SectionGridRenderItemInfo<IHomeItem>) => {
        return <GridItem {...item} />
    }

    const renderSectionHeader = ({ section }: { section: any }) => {
        const { title } = section;
        if (section.type === SectionType.NORMAL) {
            return <Section title={title}></Section>
        } else {
            return <ListItem {...section} />
        }
    }

    const scrollY = useSharedValue(0);
    const HEADER_HEIGHT = 60;


    const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        scrollY.value = event.nativeEvent.contentOffset.y;;
    }

    const headerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, 1],
            Extrapolation.CLAMP
        );
        return {
            backgroundColor: `rgba(0, 122, 255, ${opacity})`,
        };
    });
    const router = useRouter();
    const onHeaderLeftPress = () => {
        router.dismiss();
    }
    const onHeaderRightPress = () => {
        router.dismiss();
    }
    return (
        <View
            style={styles.container}
        >
            <SectionGrid
                sections={HomeData}
                itemDimension={110}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                initialNumToRender={6}
                ListHeaderComponent={<ListHeader />}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                bounces={false}
            />

            <HeaderBar
                style={headerStyle}
                leftIcon={require('../../assets/images/navbar/menu.png')}
                rightIcon={require('../../assets/images/navbar/shape.png')}
                onLeftIconPress={onHeaderLeftPress}
                onRightIconPress={onHeaderRightPress}
                titleComponent={() => {
                    return (
                        <Image
                            style={styles.headerTitleIcon}
                            source={require('../../assets/images/navbar/logo.png')} resizeMode='center' />
                    )
                }} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f6f1',
    },
    headerTitleIcon: {
        width: 63,
        height: 20,
    },
})

export default HomeScreen;