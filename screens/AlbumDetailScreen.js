import React from 'react';
import { ScrollView, StyleSheet, View, Linking, Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as actions from '../actions';
import {Avatar, Text, Icon, Divider, List, ListItem} from 'react-native-elements'

export default class AlbumDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Album Detail',
  };

constructor(){
   super();
   this.state = {
      tracks: []
   }

}	
 componentDidMount(){
 
	 const album = this.props.navigation.getParam('album',{});
   actions.getAlbumTracks(album.id).then(
   tracks => {
	   this.setState({tracks});
   
   }) 
   .catch(error => console.error(error))	 
 }	
 
async saveTrackToFavourite(album, track){
	const favouriteAlbums = await actions.retrieveData('favouriteAlbums') || {};
	let albumData = favouriteAlbums[album.id];

	if(!albumData){
	
	  albumData = album;
	}

	if(!albumData['tracks']){
	  albumData['tracks'] = {};
	}

	albumData['tracks'][track.id] = track; 
	favouriteAlbums[album.id] = albumData;
        const success= await actions.storeData('favouriteAlbums', favouriteAlbums);

	if(success){
		Alert.alert(
			'Track Added!',
			`Track ${track.title} from  ${track.artist.name} was added to Favourite!`,
			[
				{text: 'Continue', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false }
		)
	}
}


renderTracks(album){

     const {tracks} = this.state;
     
     if(tracks && tracks.length > 0 ){
        return tracks.map((track, index) => {
	
	   return(
	      <ListItem  key={index}
		         title={track.title}
		         leftIcon={{name: 'play-arrow'}}
		         leftIconOnPress={() => {Linking.openURL(track.preview) } }
		         rightIcon={
			   <Icon raised
				 name='star'
				 type='font-awesome'
				 color='#f50'
				 onPress={() => this.saveTrackToFavourite(album,track)}
		           />
			 }
	      />   
	   )
	
	})
     }	 
}

render() {

    const album = this.props.navigation.getParam('album',{});	  
    const artist = this.props.navigation.getParam('artist','');	  
    if (album.id){
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
	      <View style={styles.avatar}>
	          <Avatar xlarge rounded source={{uri: album.cover_medium}}> </Avatar>
	      </View>
	      <View style={styles.headerRight}>
                  <Text style={styles.mainText} h4>{album.title} </Text>
                  <Text style={styles.subText} h4>{artist} </Text>
	          <Icon raised
	            name='play'
	            type='font-awesome'
	            color='#f50'
	            size={30}
	            onPress={() => Linking.openURL(this.state.tracks[0].preview)}/>
	      </View>
          </View>
	  <Divider style={{backgroundColor:'black'}}/>    
          <List containerStyle={{paddingTop:0, marginTop:0}}>
	      {this.renderTracks(album)}
	  </List>
	</ScrollView>
      );
    }else{
       
       <View>
          <Text> Loading ... </Text>
       </View>
    }	    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20
  },
   avatar: {
    flex: 1,
    marginRight: 30
  },
  headerRight: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flexDirection: 'column'
  },
  mainText: {
    fontWeight: 'bold',
    color: '#3a3a3a',
    fontSize: 17
  },
  subText: {
    color: '#3a3a3a',
    fontSize: 17
  }
});
