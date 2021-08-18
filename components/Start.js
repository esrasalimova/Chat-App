import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, Touchable } from 'react-native';

// Setting the Background Image
const image = ('../assets/Background Image.png');
const colors = ['#408337', '#3a5d84', '#78519d', '#606670', '#FFFFFF'];

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      name: "",
      backgroundColor: '#408337',
    };
  }

  render() {
    const setColor = this.state.backgroundColor;
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground source={image} style={styles.image}>
        <Text>Welcome to Chat App!</Text>
        <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(name) => this.setState({ name })}
        value={this.state.name}
        placeholder="Type here ..."
        />
        <Text style={styles.text}>Select a Background Color:</Text>
            <View style={styles.colorsMenu}>
            {colors.map((selectedColor) => (
              <TouchableOpacity
              accessible={true}
              accessibilityLabel="Select Background Color"
              accessibilityHint="Sets your chat screens background color."
              accessibilityRole="button"

                key={selectedColor}
                style={[
                  styles.colorOptions(selectedColor),
                  setColor === selectedColor ? styles.border : null,
                ]}
                activeOpacity={0.5}
                onPress={() => this.setState({ backgroundColor: selectedColor })}
              />
            ))}
          </View>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Go to chat"
              accessibilityHint="Takes you to the chat screen."
              accessibilityRole="button"
              style={styles.button}
              onPress={() => this.onGoToChat(this.state.name, this.state.backgroundColor)}>  
                <Text style={styles.text}>
                  GO TO CHAT
                </Text>
              </TouchableOpacity>

        <Button title="Go to Chat" onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name} )} />
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  titleWrapper: {
    flex: 0.4,
    justifyContent: 'space-evenly',
  },
  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',

  },
  text: {
    color: "white",
    fontSize: 16,
  },
  namefield: {
    backgroundColor: '#fff',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
  },
  wrapper: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderColor: '#ffa500',
    borderWidth: 1,
    width: '88%',
    flex: 0.6,
    alignItems: 'center',
    marginBottom: '8%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  colorsMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorOptions: (selectedColor) => ({
    backgroundColor: selectedColor,
    width: 40,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderRadius: 50,
  }),
  border: {
    borderWidth: 2,
    borderColor: '#ffa500',
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#757083',
    color: '#FFFFFF',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
  },
});