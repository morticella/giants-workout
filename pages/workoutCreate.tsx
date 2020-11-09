import React, { useState } from 'react';
import { View, Text, AsyncStorage, Switch, Picker } from "react-native";
import { Header, Icon, Input } from 'react-native-elements';
import { MOCK, } from '../mocks/workout';

interface IProps {
    menuCallback(): void,
}
export const WorkoutCreate: React.FC<IProps> = (props: IProps) => {
    // const _storeData = async () => {
    //     try {
    //       await AsyncStorage.setItem(
    //         MOCK.name,
    //         JSON.stringify(MOCK),
    //       );
    //     } catch (error) {
    //       // Error saving data
    //     }
    //   };


    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(MOCK.name);
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    };
    const secondsValue = [];
    for (let i = 0; i < 60; i++) {
        secondsValue.push(
            <Picker.Item label={i.toString()} value={i} key={i} />
        )
    }

    //  _storeData();
    _retrieveData();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [seconds, setSeconds] = useState('00');
    const [minutes, setMinutes] = useState('00');
    return (
        <>
            <Header
                containerStyle={{ backgroundColor: '#fff' }}
                leftComponent={{ icon: 'menu', color: '#000' }}
                centerComponent={{ text: 'CREATE NEW WORKOUT', style: { color: '#000' } }}
                rightComponent={<Icon
                    name='gear'
                    type='font-awesome'
                    color='#000'
                    backgroundColor='trasparent'
                    onPress={props.menuCallback} />}
            />
            <View>
                <Input
                    placeholder="WORKOUT NAME"

                />
                <View><Text>
                    WARM UP <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                /> {seconds} : {minutes}

                </Text></View>
                <View 
                style={{ flex: 1, flexDirection: 'row'}}
                >
                {isEnabled &&<Picker
                    selectedValue={seconds}
                    style={{ height: 50, width: '45%' }}
                    onValueChange={(itemValue, itemIndex) => setSeconds(itemValue)}
                >

                    {secondsValue.map(value => value)}
                </Picker>}
                {isEnabled &&<Picker
                    selectedValue={minutes}
                    style={{ height: 50, width: '45%' }}
                    onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
                >

                    {secondsValue.map(value => value)}
                </Picker>}
                </View>
                <View>
                <Text>
                    INTERVAL CYCLE <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                /> 6

                </Text>
                </View>
                <Text>
                    REPEAT <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                /> {isEnabled && 6}

                </Text>
                <View>
                <Text>
                    COOLDOWN <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                /> 00 : 10

                </Text>
                </View>
            </View>
        </>
    )
}