import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from "react-native"
import { Header, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { IWorkout } from 'mocks/workout';
import { PAGE_TIMER_WORKOUT, LOAD_RUNNING_WORKOUT_SUCCESS, FETCH_WORKOUTS_SUCCESS } from '../assets/constants';

interface IProps {
    menuCallback(): void,
}
interface IState {
    workouts: { workouts: IWorkout[] }
}
export const Home: React.FC<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const persistWorkouts: IWorkout[] = useSelector((state:IState) => state.workouts.workouts)
    useEffect(() => {
        dispatch({ type: FETCH_WORKOUTS_SUCCESS, workouts: persistWorkouts });
    }, []);

    const runningWorkout: Function = (workoutName: string): IWorkout | void  => {
        persistWorkouts.map((workout: IWorkout) => {
            if (workout.name === workoutName) {
                dispatch({ type: LOAD_RUNNING_WORKOUT_SUCCESS, workouts: workout });
                return workout
            }
        })
    };

    const test: any[] = [];

    persistWorkouts.map((workout: IWorkout) => {
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
                centerComponent={{ text: 'GIANT WORKOUT', style: { color: '#fff' } }}
                rightComponent={<Icon
                    name='list'
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
                        dispatch({type: PAGE_TIMER_WORKOUT})
                    }} /></Text>}
                />
            </View>
        </>
    )
}