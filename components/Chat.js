import React from "react";
import { View, Platform, Button, KeyboardAvoidingView } from "react-native";

import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firebase from "firebase";

//Firebase DB
//const firebase = require('firebase');
//require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    // Firebase config details
   const firebaseConfig = {
    apiKey: "AIzaSyASaZho3f5xkW6LF6415NtoUZwGSBLNKKg",
    authDomain: "chat-app-cedf3.firebaseapp.com",
    projectId: "chat-app-cedf3",
    storageBucket: "chat-app-cedf3.appspot.com",
    messagingSenderId: "416532966096",
    appId: "1:416532966096:web:8070b549943c9454e70cd5",
    measurementId: "G-VJEPJLKFD7"
   }
   if (!firebase.apps.length) {
     firebase.intitializeApp(firebaseConfig);
   }

   this.referenceChatMessages = firebase.firestore().collection('messages');
   this.referenceMessageUser = null;

    this.state={
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
    }
  }

  componentDidMount() {
    let username = this.props.route.params.username;
    this.props.navigation.setOptions({ title: username });
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    },
    this.setState({
      uid:user.uid,
      messages: [
        {
          _id:1,
          createdAt: new Date(),
          text: 'Hello Developer',
          user: {
            _id:4,
            name: 'React Feedback',
            avatar: 'https://placeimg.com/140/140/any',
          }
        },
        {
          _id:2,
          text: 'Welcome to the "talk" Chat App, it is ' + new Date() + ' Welcome! For additional help visit the docs at https://#.github.io/talk ',
          createdAt: new Date(),
          user: {
            _id:3,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text:'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    }),
    this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate));
  }
  componentWillUnmount() {
    this.authUnsubscribe();
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //add messages to database
  addMessages() {
    this.referenceChatMessages.addMessages({
      _id: messages._id,
      createdAt: messages.createdAt,
      text: messages.text,
      user: messages.user,
    })
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };
  renderBubble(props) {
    return (
      <Bubble
        {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            }
          }}
      />
    );
  }

  render() {
    return (
      // <View
      //   style={{
      //     flex: 1,
      //     justifyContent: "center",
      //     alignItems: "center",
      //     backgroundColor: this.props.route.params.backgroundColor,
      //   }}>
      //   <Button
      //     title='Go to Start'
      //     onPress={() => this.props.navigation.navigate("Start")}
        // />
        <View  style={{
          flex: 1,
          // justifyContent: "center",
          // alignItems: "center",
          backgroundColor: this.props.route.params.backgroundColor,
        }}>
          <GiftedChat 
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id:1,
            }}
          />
          {Platform.OS === 'android' ? <KeyboardAvoidingView behaviour='height' /> : null }
        </View>
      // </View>
    );
  }
}