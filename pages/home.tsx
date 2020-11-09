import React from 'react';
import { View, Text } from "react-native"
import { Header, Icon } from 'react-native-elements'

interface IProps {
    menuCallback(): void,
}
export const Home: React.FC<IProps> = (props: IProps) => {
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
            <Text>
                Home
            </Text>
        </View>
        </>
    )
}