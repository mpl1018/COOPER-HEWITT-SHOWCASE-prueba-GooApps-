import React from 'react';
import { Text } from 'react-native';
import { Button, Card } from 'react-native-elements';

export default function App ({title, img}) {
    return (
        <Card
        title={title}
        image={{uri: img}}>
        <Text style={{marginBottom: 10}}>
            The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='MORE INFO' />
        </Card>
    );

}