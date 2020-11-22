import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { StartButton } from '../components/start-button';
import { DigitalDisplay } from '../components/digital-display';
import { workoutSettigs, IWorkout } from '../mocks/workout';
import { AVPlaybackSource } from 'expo-av/build/AV';
import { useSelector } from 'react-redux';

const moment = extendMoment(Moment);

interface IWorkoutSettings {
    counter: number;
    duration: number;
    start: boolean;
    stop: boolean;
    reset: boolean;
    background: string;
    seconds: string;
    music(sound: AVPlaybackSource, soundObject?: any): Promise<any>;
}

interface IProps {
    menuCallback(): void,
}
interface IState {
    workouts: { runningWorkout: IWorkout }
}
export const WorkoutTimer: React.FC<IProps> = props => {
    const selectedWorkout = useSelector((state: IState) => state.workouts.runningWorkout);
    let i: number;
    const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

    const [timer, setTimer] = useState<IWorkoutSettings>(workoutSettigs(selectedWorkout));

    useEffect(() => {
        if (timer.stop) {
            setTimer(state => {
                return {
                    ...state,
                    seconds: moment().hour(0).minute(0).second(state.counter).format('mm : ss').toString()
                }
            });
        }
    }, [timer.stop]);

    useEffect(() => {
        let interval: any;
        let cycleType = 'high';
        let j = 0;
        let checkType = 0;
        timer.stop || timer.reset ? i = timer.counter : i = timer.duration ? timer.duration : selectedWorkout.intervals[0].high.duration;
        if (timer.start) {
            interval = setInterval(() => {
                Vibration.vibrate(PATTERN);
                i--;
                setTimer(state => ({
                    ...state,
                    counter: i,
                    seconds: moment().hour(0).minute(0).second(i).format('mm : ss').toString(),
                }));
                console.log('duration 2 ', i, timer.seconds);
                if (i === -1) {
                    if (checkType > 1) {
                        j++;
                    }
                    checkType++;
                    if (j === selectedWorkout.intervals.length) {
                        j = 0;
                    }
                    console.log('checkType ', checkType, cycleType);
                    if (checkType % 2 === 0) {
                        cycleType = 'low'
                    } else {
                        cycleType = 'high'
                    }
                    if (checkType > selectedWorkout.intervals[j].repeat * 2) {
                        if (checkType % 2 === 0) {
                            i = 0;
                            setTimer(state => ({
                                ...state,
                                counter: 0,
                                seconds: moment().hour(0).minute(0).second(0).format('mm : ss').toString(),
                                duration: 0,
                                background: 'orange',
                                start: false,
                                reset: true,
                                stop: false,
                            }));
                        } else {
                            timer.music(selectedWorkout.intervals[j].rest.soundEffect);
                            i = selectedWorkout.intervals[j].rest.duration;
                            setTimer(state => ({
                                ...state,
                                counter: selectedWorkout.intervals[j].rest.duration,
                                seconds: moment().hour(0).minute(0).second(selectedWorkout.intervals[j].rest.duration).format('mm : ss').toString(),
                                duration: selectedWorkout.intervals[j].rest.duration,
                                background: selectedWorkout.intervals[j].rest.styles.background,
                            }));
                        }
                    } else {
                        if (cycleType === 'high') {
                            // timer.music(selectedWorkout.intervals[j].high.soundEffect);
                            i = selectedWorkout.intervals[j].high.duration;
                            setTimer(state => ({
                                ...state,
                                counter: selectedWorkout.intervals[j].high.duration,
                                seconds: moment().hour(0).minute(0).second(selectedWorkout.intervals[j].high.duration).format('mm : ss').toString(),
                                duration: selectedWorkout.intervals[j].high.duration,
                                background: selectedWorkout.intervals[j].high.styles.background,
                            }));
                        }
                        if (cycleType === 'low') {
                            // timer.music(selectedWorkout.intervals[j].low.soundEffect);
                            i = selectedWorkout.intervals[j].low.duration;
                            setTimer(state => ({
                                ...state,
                                counter: selectedWorkout.intervals[j].low.duration,
                                seconds: moment().hour(0).minute(0).second(selectedWorkout.intervals[j].low.duration).format('mm : ss').toString(),
                                duration: selectedWorkout.intervals[j].low.duration,
                                background: selectedWorkout.intervals[j].low.styles.background,
                            }));
                        }
                    }
                }
            }, 1000);
            return () => clearInterval(interval);
        } else {
            return () => clearInterval(interval);
        }
    }, [timer.start]);

    const handleStart = () => {
        timer.music(selectedWorkout.warmUp.soundEffect);
        setTimer(state => ({
            ...state,
            start: true,
            reset: false,
        }));
        Vibration.vibrate(PATTERN);
    }
    const handleStop = () => {
        setTimer(state => ({
            ...state,
            start: false,
            reset: false,
            stop: true,
        }));
    }
    const handleReset = () => {
        i = selectedWorkout.warmUp.duration;
        setTimer({
            ...workoutSettigs(selectedWorkout),
            reset: true,
        });
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: timer.background,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: '400',
        }
    });

    return (
        <>
            <Header
                containerStyle={{ backgroundColor: timer.background, borderBottomColor: timer.background }}
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: selectedWorkout.name, style: { color: '#fff' } }}
                rightComponent={<Icon
                    // raised
                    name='gear'
                    type='font-awesome'
                    color='#fff'
                    backgroundColor='trasparent'
                    onPress={props.menuCallback} />}
            />
            <View style={styles.container}>
                <DigitalDisplay seconds={timer.seconds} />
            </View>
            <View style={styles.container}>
                <StartButton label={'START'} start={0} callback={handleStart} />
                <StartButton label={'STOP'} start={0} callback={handleStop} />
                <StartButton label={'RESET'} start={0} callback={handleReset} />
            </View>
            {}
        </>
    );
}