import React from 'react';
import { View, Text, Button } from 'react-native';


export default class Chat extends React.Component {
  render() {
    let username = this.props.route.params.username;
    this.props.navigation.setOptions({ title: username});
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello Chat!</Text>
        <Button
        title="Go to Start"
        onPress={() => this.props.navigation.navigate("Start")}
        />
      </View>
    )
  }
}