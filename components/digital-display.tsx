import React from 'react';
import { Text, StyleSheet } from 'react-native';

type IProps = {
    seconds: number| any;
    callback?: Function;
}

export const DigitalDisplay: React.FC<IProps> = props => {
  const styles = StyleSheet.create({
    title: {
      fontSize: 96,
      fontWeight: '400',
    }
  });
  return (
      <Text style={styles.title} >{props.seconds}</Text>
  );
}