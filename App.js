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
      rawJSONdata: [],
      itemLastCalled: 0,
    }
  }


  componentDidMount() {
    this.getData()      
  }
  
  async getData() {
    try {
      let response = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getOnDisplay&access_token=${API_KEY}`)
      let responseJSON = await response.json();      
      this.setState({
        rawJSONdata: responseJSON
      })
      this.getImages(); 

    } catch (error) {
      console.error(error)
    }
  }

  async getImages() {
    try{
      let listItems = [];
      let newRender = this.state.itemLastCalled + 5
      console.log ("antes: " + this.state.itemLastCalled + "; despues: " + newRender)
      let elementArray = this.state.rawJSONdata.objects.slice(this.state.itemLastCalled, newRender)
      ++newRender;
      this.setState({itemLastCalled: newRender})
      for (let element of elementArray) {
        let resImg = await fetch(`https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.objects.getImages&access_token=${API_KEY}&object_id=${element.id}`); 
        let resImgJSON = await resImg.json();

        let obj = {
          id: element.id,
          title: element.title, 
          img: resImgJSON.images[0].n.url,
          des: element.medium,
          url: element.url
        }
        listItems.push(obj)
      }
      listItems = this.state.dataSource.concat(listItems);
      this.setState({
        dataSource : listItems, 
        isLoading: false,
      })
      
    } catch {
      console.error(error)
    }
  }

  

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'COOPER HEWITT', style: styles.headerTitle }}
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
          renderItem={({ item }) => <Item title={item.title} img={item.img} des={item.des} url={item.url} />}
          keyExtractor={item => item.id}
          onEndReached={ ({ distanceFromEnd }) => {
            if (distanceFromEnd < 0) return;
            this.getImages();
          }}
          onEndReachedThreshold={0.5}
          extraData={this.state}
        />
      </View>
    );
  }
}

