import React, { useState } from 'react';
import { View, Text, AsyncStorage, Switch, Picker, Slider } from "react-native";
import { Header, Icon, Input } from 'react-native-elements';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { useSelector } from 'react-redux';
import { IWorkout, workoutSettigs } from 'mocks/workout';

const moment = extendMoment(Moment);

interface IProps {
    menuCallback(): void,
}

interface IState {
    workouts: { runningWorkout: IWorkout }
}
export const WorkoutEdit: React.FC<IProps> = (props: IProps) => {
    const runningWorkout: IWorkout = useSelector((state:IState) => state.workouts.runningWorkout)

    const secondsValue = [];
    for (let i = 0; i < 60; i++) {
        secondsValue.push(
            <Picker.Item label={i < 10 ? '0' + i.toString() : i.toString()} value={i} key={i} />
        )
    }

    const [isEnabled, setIsEnabled] = useState(false);
    const [showWarmUp, setShowWarmUp] = useState(false);
    const [showCycle, setShowCycle] = useState(false);
    const [showLow, setShowLow] = useState(false);
    const [showHigh, setShowHigh] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);
    const [showCooldown, setShowCooldown] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchWarmUp = () => setShowWarmUp(previousState => !previousState);
    const toggleCycle = () => setShowCycle(previousState => !previousState);
    const toggleHigh = () => setShowHigh(previousState => !previousState);
    const toggleLow = () => setShowLow(previousState => !previousState);
    const toggleRepeat = () => setShowRepeat(previousState => !previousState);
    const toggleCooldown = () => setShowCooldown(previousState => !previousState);
    
    const [seconds, setSeconds] = useState(runningWorkout.warmUp.duration.toString());
    const [minutes, setMinutes] = useState('00');
    const [sec, setSec] = useState(runningWorkout.warmUp.duration);
    const [min, setMin] = useState(0);
    const [cycle, setCycle] = useState(0);
    const [highSec, setHighSec] = useState(runningWorkout.intervals[0].high.duration);
    const [highMin, setHighMin] = useState(0);
    const [lowSec, setLowSec] =  useState(runningWorkout.intervals[0].low.duration);
    const [lowMin, setLowMin] =  useState(0);
    const [repeat, setRepeat] =  useState(runningWorkout.intervals[0].repeat);
    const [cooldownSec, setCooldownSec] =  useState(runningWorkout.intervals[0].rest.duration);
    const [cooldownMin, setCooldownMin] =  useState(0);

    const handleSave = async () => {
            try {
                    await AsyncStorage.setItem(
                        runningWorkout.name+'WORKOUT',
                        JSON.stringify({
                            name: runningWorkout.name,
                            warmUp: {
                                isOn: true,
                                duration: sec + min * 60,
                                // soundEffect: require('../assets/sounds/Swoosh.mp3'),
                                styles: {
                                    background: 'yellow',
                                }
                            },
                            intervals: [{
                                high: {
                                    isOn: true,
                                    duration: highSec + highMin * 60,
                                    // soundEffect: require('../assets/sounds/alarm_2.mp3'),
                                    styles: {
                                        background: 'red',
                                    }
                                },
                                low: {
                                    isOn: true,
                                    duration: lowSec + lowMin * 60,
                                    // soundEffect: require('../assets/sounds/BeeperEmergencyCall.mp3'),
                                    styles: {
                                        background: 'green',
                                    }
                                },
                                rest: {
                                    isOn: true,
                                    duration: cooldownSec + cooldownMin * 60,
                                    // soundEffect: require('../assets/sounds/finished.wav'),
                                    styles: {
                                        background: 'blue',
                                    }
                                },
                                repeat,
                            }]
                        }),
                      );
            } catch (error) {
               
             
              console.log(error);
    
          };
        }
    return (
        <>
            <Header
                containerStyle={{ backgroundColor: 'skyblue' }}
                leftComponent={{ icon: 'menu', color: '#000' }}
                centerComponent={{ text: runningWorkout.name, style: { color: '#000' } }}
                rightComponent={<Icon
                    name='gear'
                    type='font-awesome'
                    color='#000'
                    backgroundColor='trasparent'
                    onPress={props.menuCallback} />}
            />
            <View style={
            { flex: 2, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'skyblue' }
            }>
                {/* <Input placeholder="WORKOUT NAME" onChangeText={value => setTitle(value)} value={title} /> */}
                <View style={showWarmUp ? { backgroundColor: 'skyblue' } : { flex: 1, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'skyblue' }} >
                    <Text>
                        WARM UP 
                        {moment().hour(0).minute(+minutes).second(+seconds).format('mm : ss').toString()}
                        <Text onPress={toggleSwitchWarmUp}>Edit</Text>
                    </Text>
                </View>

                {showWarmUp && <><View
                    style={{ flexDirection: 'row', height: 20, alignItems: 'stretch', justifyContent: 'center' }}
                >
                    <Text>Seconds</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, alignItems: 'stretch', justifyContent: 'center' }}
                    >
                    <Slider
                        value={sec}
                        onValueChange={(value) => {
                            setSec(value);
                            setSeconds(value.toString());
                        }}
                        maximumValue={59}
                        minimumValue={0}
                        step={1}
                        style={{ width: '90%' }}
                    />
                </View>
                    <View
                        style={{ flexDirection: 'row', height: 20, alignItems: 'stretch', justifyContent: 'center' }}
                    >
                        <Text>Minutes</Text>
                        </View>
                        <View
                        style={{ flexDirection: 'row', height: 40, alignItems: 'stretch', justifyContent: 'center' }}
                    >
                        <Slider
                            value={min}
                            onValueChange={(value) => {
                                setMin(value);
                                setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    </View></>}

                <View style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Text>INTERVAL CYCLE {cycle} <Icon
                    name='edit'
                    type='font-awesome'
                    color='#000'
                    backgroundColor='trasparent'
                    onPress={toggleCycle}
                    /></Text> 
                </View>
                {showCycle && <View
                        style={{ flexDirection: 'row', height: 40, alignItems: 'stretch', justifyContent: 'center' }}
                    >
                        <Slider
                            value={cycle}
                            onValueChange={(value) => {
                                setCycle(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={99}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    </View>}
                <View style={{ flex: 1, backgroundColor: 'powderblue', flexDirection: 'row', }} >
                    <Text>High {moment().hour(0).minute(highMin).second(highSec).format('mm : ss').toString()} <Icon
                    name='edit'
                    type='font-awesome'
                    color='#000'
                    backgroundColor='trasparent'
                    onPress={toggleHigh}
                    /></Text><Text>Low {moment().hour(0).minute(lowMin).second(lowSec).format('mm : ss').toString()} <Icon
                    name='edit'
                    type='font-awesome'
                    color='#000'
                    backgroundColor='trasparent'
                    onPress={toggleLow}
                    /></Text>
                </View>
                {showHigh && <><View
                    style={{ flexDirection: 'row', height: 20 }}
                >
                    <Slider
                            value={highSec}
                            onValueChange={(value) => {
                                setHighSec(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    
                    </View>
                    <View
                    style={{ flexDirection: 'row', height: 20 }}
                >
                    <Slider
                            value={highMin}
                            onValueChange={(value) => {
                                setHighMin(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    
                    </View>
                    </>}
                    {showLow && <><View
                    style={{ flexDirection: 'row', height: 20 }}
                >
                    <Slider
                            value={lowSec}
                            onValueChange={(value) => {
                                setLowSec(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    
                    </View>
                    <View
                    style={{ flexDirection: 'row', height: 20 }}
                >
                    <Slider
                            value={lowMin}
                            onValueChange={(value) => {
                                setLowMin(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    
                    </View>
                    </>}
                <Text>
                    REPEAT <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    /> {isEnabled && <><Text>{repeat}</Text> <Icon
                        name='edit'
                        type='font-awesome'
                        color='#000'
                        backgroundColor='trasparent'
                        onPress={toggleRepeat}
                        /></>} 
                </Text>
                {showRepeat && <View
                        style={{ flexDirection: 'row', height: 40, alignItems: 'stretch', justifyContent: 'center' }}
                    >
                        <Slider
                            value={repeat}
                            onValueChange={(value) => {
                                setRepeat(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={99}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    </View>}
                <View style={{ flex: 1, backgroundColor: 'steelblue' }}>
                    <Text>
                        COOLDOWN <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        /> {moment().hour(0).minute(cooldownMin).second(cooldownSec).format('mm : ss').toString()} <Icon
                        name='edit'
                        type='font-awesome'
                        color='#000'
                        backgroundColor='trasparent'
                        onPress={toggleCooldown}
                        />

                </Text>
                </View>
                {showCooldown && <><View
                    style={{ flexDirection: 'row', height: 20 }}
                >
                    <Slider
                            value={lowSec}
                            onValueChange={(value) => {
                                setCooldownSec(value);
                                // setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    
                    </View>
                    <View
                    style={{ flexDirection: 'row', height: 20 }}
                >
                    <Slider
                            value={lowMin}
                            onValueChange={(value) => {
                                setCooldownMin(value);
                                
                                // setMinutes(value.toString());
                            }}
                            maximumValue={59}
                            minimumValue={0}
                            step={1}
                            style={{ width: '90%' }}
                        />
                    
                    </View>
                    </>}
                    <Icon
                        name='save'
                        type='font-awesome'
                        color='#000'
                        backgroundColor='trasparent'
                        onPress={handleSave}
                        />
            </View>
        </>
    )
}