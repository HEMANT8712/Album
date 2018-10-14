import React from 'react';
import { ScrollView, StyleSheet, View, Linking } from 'react-native';
import * as actions from '../actions';
import _ from 'lodash';
import {Card, Button, Text, List, ListItem, Icon} from 'react-native-elements';


export default class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favourite Albums',
  };

constructor(){
   super();

   this.state ={
     favouriteAlbums: undefined
   }	
   this.getFavouriteAlbums();
}

async getFavouriteAlbums(){

  const favouriteAlbums = await actions.retrieveData('favouriteAlbums');
  if(favouriteAlbums){
    this.setState({favouriteAlbums});
  }
}

async  deleteAlbum(albumId){

   const {favouriteAlbums}= this.state;

   delete favouriteAlbums[albumId];

   const success = await actions.storeData('favouriteAlbums', favouriteAlbums);

   if(success){
     this.setState({favouriteAlbums});
   }

}


renderFavouriteTracks(tracks){


	if(tracks){
	
	  return _.map(tracks,(track,id) => {
	     
	     return(
	        <ListItem 
		     key = {id}
		     title={track.title}
		     leftIcon={{name:'play-arrow'}}
		     rightIcon={
		        <Icon
			     raised
			     name='music'
			     type='font-awesome'
			     color='#f50'
			     onPress = {() => Linking.openURL(track.preview)}/>
		     }/>
	     
	     )	  
	  
	  })
	}

}

renderFavouriteAlbums(){
  const{favouriteAlbums} = this.state;

	if(favouriteAlbums){
	  //Object iteration
          //Object.keys(favouriteAlbums).map(() => {})
		return _.map(favouriteAlbums, (album,id) => {
		   return (
		     <View key={id}>
			   <Card 
			         title={album.title}>
                               <Button
			           title='Delete Album'
			           raised
			           backgroundColor='#f50'
			           name='trash'
			           onPress={() => this.deleteAlbum(album.id)}/>
			   
			      {this.renderFavouriteTracks(album.tracks)}
			   </Card>
		     </View>
		   )
		})

	}

}
  render() {
    return (
      <ScrollView style={styles.container}>
             <List containerStyle={styles.listContainer}>  
	    
	       {this.renderFavouriteAlbums()}
	     </List>  
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  listContainer:{
    backgroundColor: '#eaeaea',
	  
  }	
});
