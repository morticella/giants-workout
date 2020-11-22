import React, { useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage, StyleSheet } from "react-native"
import { Header, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { IWorkout } from 'mocks/workout';
import { WORKOUT_TIMER } from '../assets/constants';

interface IProps {
    menuCallback(): void,
}
let list: { key: string }[] = [];
let listStore: string[] = [];
// AsyncStorage.clear();
export const workouts = async () => {
    console.log('triggered');
    list = [];
    listStore = [];
    await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys as string[], (err, stores) => {
            if (!stores) {
                return;
            }
            stores.map((result, i, store) => {
                if (store[i][0].includes('WORKOUT')) {
                    listStore.push(store[i][1]);
                }

            });
        });
    });
    return { listStore, list };
}
export const Home: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const persistWorkouts = useSelector(state => state?.workouts?.workouts)
    useEffect(() => {
        // workouts();
        setTimeout(() => {
            dispatch({ type: 'fetchWorkouts', workouts: persistWorkouts });
        }, 200);
    }, []);

    const workoutsState: IWorkout[] = useSelector(state => state?.workouts?.workouts) || [];

    const runningWorkout: Function = (workoutName: string): IWorkout | void  => {
        workoutsState.map((workout: IWorkout) => {
            if (workout.name === workoutName) {
                console.log('->', workout);
                dispatch({ type: 'loadWorkout', workouts: workout });
                return workout
            }
        })
    };
    useSelector(state => console.log(state));

    const test: any[] = [];

    workoutsState.map((workout: IWorkout) => {
        test.push({ key: workout.name })
    })

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
                    data={test}
                    renderItem={({ item }) => <Text style={styles.item}>{item.key} <Icon
                    name='chevron-right'
                    type='font-awesome'
                    color='#000'
                    backgroundColor='trasparent'
                    onPress={() => {
                        runningWorkout(item.key);
                        dispatch({type: WORKOUT_TIMER})
                    }} /></Text>}
                />
            </View>

        </>
    )
}