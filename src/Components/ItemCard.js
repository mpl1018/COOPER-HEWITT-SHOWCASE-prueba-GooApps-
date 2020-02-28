import React from 'react';
import { Text, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function App ({title, img, des, url}) {
    return (
        <Card
        title={title}
        image={{uri: img}}>
        <Text style={{marginBottom: 10}}>
            {des.toUpperCase()}
        </Text>
        <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='MORE INFO' 
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['grey', 'black'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={() => { Linking.openURL(url)}}
            />

        </Card>
    );

}