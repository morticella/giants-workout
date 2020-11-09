import { AVPlaybackSource } from "expo-av/build/AV";
import { Audio } from 'expo-av';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export interface IActivityType {
    high: IActivityModel,
    low: IActivityModel,
    rest: IActivityModel,
    repeat: number,  
}

export interface IActivityStyle {
    background: string,
}

export interface IActivityModel {
    isOn: boolean,
    duration: number,
    soundEffect: AVPlaybackSource,
    styles: IActivityStyle,
}

export interface IWorkout {
    name: string,
    warmUp: IActivityModel,
    intervals: IActivityType[],
}

export const MOCK: IWorkout = {
    name: 'My first workout with Giants Workout',
    warmUp: {
        isOn: true,
        duration: 3,
        soundEffect: require('../sounds/Swoosh.mp3'),
        styles: {
            background: 'yellow',
        }
    },
    intervals: [{
        high: {
            isOn: true,
            duration: 3,
            soundEffect: require('../sounds/alarm_2.mp3'),
            styles: {
                background: 'red',
            }
        },
        low: {
            isOn: true,
            duration: 2,
            soundEffect: require('../sounds/BeeperEmergencyCall.mp3'),
            styles: {
                background: 'green',
            }
        },
        rest: {
            isOn: true,
            duration: 2,
            soundEffect: require('../sounds/finished.wav'),
            styles: {
                background: 'blue',
            }
        },
        repeat: 2,
    }]
}

export const workoutSettigs = {
    counter: MOCK.warmUp.duration,
    duration: MOCK.warmUp.duration,
    start: false,
    stop: false,
    reset: false,
    background: MOCK.warmUp.styles.background,
    seconds: moment().minute(0).second(MOCK.warmUp.duration).format('mm : ss').toString(),
    music: async (sound: AVPlaybackSource, soundObject = new Audio.Sound()) => {
        try {
            await soundObject.loadAsync(sound);
            await soundObject.playAsync();
            setTimeout(() => {
                soundObject.unloadAsync();
            }, 2000);
        } catch (error) {
        }
    },
}