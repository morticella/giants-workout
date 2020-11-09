import React from 'react';
// import { Button, Alert } from 'react-native';
import { Button } from 'react-native-elements';

type IProps = {
    start: number;
    label: string;
    callback: any;
}

export const StartButton: React.FC<IProps> = props => {
  return (
      <Button
        title={props.label}
        style={{margin: 10,}}
        onPress={props.callback}
      />
  );
}