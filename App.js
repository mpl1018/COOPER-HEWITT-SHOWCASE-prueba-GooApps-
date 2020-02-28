import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Header, Card, ListItem, Icon } from 'react-native-elements';

export default class App extends Component {
  

  render() {
    return (
      <View style={styles.container}>
      <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
  <Card
  title='HELLO WORLD'
  image={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}>
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>
  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
  }
});
