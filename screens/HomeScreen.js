import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button	
} from 'react-native';
import { WebBrowser } from 'expo';
import {List, ListItem, Text, Icon, Card} from 'react-native-elements';
import { MonoText } from '../components/StyledText';

const menuList = [
	{
	  title: ' Search Albums',
          subtitle: 'Search your Favourite music',
          icon: 'music',
	  navigateTo: 'Albums'	
	},
	{
	  title: ' Favourite Collection',
          subtitle: 'Access your Favourite albums',
          icon: 'heart',
	  navigateTo: 'Favourite'	
	},
	{
	  title: ' Settings',
          subtitle: 'Customize your app',
          icon: 'cog',
	  navigateTo: 'Settings'	
	}
]

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'My Home',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
	 <List containerStyle={{backgroundColor:'#eaeaea', marginTop:0}}>   
           {
		   menuList.map((item, index) => {
		   return(
		      <Card key={index}
			    title={item.title}>
		        <View style={styles.cardView}>
                            <Text style={{marginBottom:10}}> {item.subtitle}</Text>
			    <Icon 
			        raised
			        name={item.icon}
			        type='font-awesome'
			        color='#f50'
			        size={30}
			        onPress={() => {this.props.navigation.navigate(item.navigateTo)}}/>
		        </View>
		     </Card>	   
		      
		   )
		   })
	   }
	 </List>
	   
      </ScrollView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardView:{
      alignItems:'center'
  }	
});
