import React from 'react';
import { Text, Linking, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';



export default function App ({title, img, des, url}) {
    const shareOptions = {
        title: 'Share via',
        message: 'Mira este objeto de la COOPER HEWITT GALLERY: ',
        url: url,
    };
    return (
        <Card
        title={title}
        image={{uri: img}}>
        <Text style={{marginBottom: 10}}>
            {des.toUpperCase()}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, width: '120%'}}
                title='MORE INFO' 
                ViewComponent={LinearGradient} 
                linearGradientProps={{
                colors: ['grey', 'black'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
                }}
                onPress={() => { Linking.openURL(url)}}
                />
            
            <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        
                icon={
                    <Icon
                      name="share"
                      size={20}
                      color="black"
                    />
                }
                ViewComponent={LinearGradient} 
                linearGradientProps={{
                colors: ['white', 'white'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
                }}
                onPress={() => {Share.open(shareOptions)}}
                />    
            
        </View>

        </Card>
    );

}