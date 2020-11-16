import React, { useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage, StyleSheet } from "react-native"
import { Header, Icon } from 'react-native-elements'

interface IProps {
    menuCallback(): void,
}
let list: { key: string }[] = [];
const workouts = async () => {
    list = [];
    // AsyncStorage.clear();
    await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                console.log('------> ', store[i][0], store[i][1]);
                list.push({ key: store[i][0] });
            });
        });
    });
}
// workouts();
export const Home: React.FC<IProps> = (props: IProps) => {
    useEffect(() => {
        workouts();
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 22
        },
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
    });
    //   workouts();
    console.log('list ', list);
    return (
        <>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={<Icon
                    name='gear'
                    type='font-awesome'
                    color='#fff'
                    backgroundColor='trasparent'
                    onPress={props.menuCallback} />}
            />
            <View>
                <FlatList
                    data={list}
                    renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
        </>
    )
}