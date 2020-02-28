import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Button, Header, Card, ListItem, Icon } from 'react-native-elements';

import styles from './src/Styles'
import { API_KEY } from 'react-native-dotenv'
import Item from './src/Components/ItemCard'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      dataSource: [], 
    }
  }


  componentDidMount() {
    this.getData()      
  }
  
  async getData() {
    try {
      let response = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${API_KEY}`)
      let responseJSON = await response.json();
      let listItems = [];
      let elementArray = responseJSON.objects.slice(1, 6)
      for (let element of elementArray) {
        let resImg = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getImages&access_token=${API_KEY}&object_id=${element.id}`); 
        let resImgJSON = await resImg.json();

        let obj = {
          id: element.id,
          title: element.title, 
          img: resImgJSON.images[0].n.url,
          des: element.medium
        }
        listItems.push(obj)
      }
      this.setState({
        dataSource : listItems, 
        isLoading: false,
      })
      

    } catch (error) {
      console.error(error)
    }
  }


  

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'COPER HEWITT', style: styles.headerTitle }}
            backgroundColor='black'
          />
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'COOPER HEWITT', style: styles.headerTitle }}
          backgroundColor='black'
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Item title={item.title} img={item.img} des={item.des} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

