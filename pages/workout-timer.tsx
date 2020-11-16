import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { StartButton } from '../components/start-button';
import { DigitalDisplay } from '../components/digital-display';
import { MOCK, workoutSettigs } from '../mocks/workout';
import { AVPlaybackSource } from 'expo-av/build/AV';

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

export const WorkoutTimer: React.FC<IProps> = props => {
    let i: number;
    const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [1 * ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

    const [timer, setTimer] = useState<IWorkoutSettings>(workoutSettigs);

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
        timer.stop || timer.reset ? i = timer.counter : i = timer.duration ? timer.duration : MOCK.intervals[0].high.duration;
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
                    if (j === MOCK.intervals.length) {
                        j = 0;
                    }
                    console.log('checkType ', checkType, cycleType);
                    if (checkType % 2 === 0) {
                        cycleType = 'low'
                    } else {
                        cycleType = 'high'
                    }
                    if (checkType > MOCK.intervals[j].repeat * 2) {
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
                            timer.music(MOCK.intervals[j].rest.soundEffect);
                            i = MOCK.intervals[j].rest.duration;
                            setTimer(state => ({
                                    ...state,
                                    counter: MOCK.intervals[j].rest.duration,
                                    seconds: moment().hour(0).minute(0).second(MOCK.intervals[j].rest.duration).format('mm : ss').toString(),
                                    duration: MOCK.intervals[j].rest.duration,
                                    background: MOCK.intervals[j].rest.styles.background,
                                }));
                        }
                    } else {
                        if (cycleType === 'high') {
                            timer.music(MOCK.intervals[j].high.soundEffect);
                            i = MOCK.intervals[j].high.duration;
                            setTimer(state => ({
                                    ...state,
                                    counter: MOCK.intervals[j].high.duration,
                                    seconds: moment().hour(0).minute(0).second(MOCK.intervals[j].high.duration).format('mm : ss').toString(),
                                    duration: MOCK.intervals[j].high.duration,
                                    background: MOCK.intervals[j].high.styles.background,
                                }));
                        }
                        if (cycleType === 'low') {
                            timer.music(MOCK.intervals[j].low.soundEffect);
                            i = MOCK.intervals[j].low.duration;
                            setTimer(state => ({
                                    ...state,
                                    counter: MOCK.intervals[j].low.duration,
                                    seconds: moment().hour(0).minute(0).second(MOCK.intervals[j].low.duration).format('mm : ss').toString(),
                                    duration: MOCK.intervals[j].low.duration,
                                    background: MOCK.intervals[j].low.styles.background,
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
        timer.music(MOCK.warmUp.soundEffect);
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
        i = MOCK.warmUp.duration;
        setTimer({
                ...workoutSettigs,
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
        containerStyle={{backgroundColor: timer.background, borderBottomColor: timer.background}}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: MOCK.name, style: { color: '#fff' } }}
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