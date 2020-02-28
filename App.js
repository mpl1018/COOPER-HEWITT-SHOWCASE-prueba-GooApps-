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
          img: resImgJSON.images[0].n.url
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
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'COPER HEWITT', style: { color: '#fff' } }}
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Item title={item.title} img={item.img} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

