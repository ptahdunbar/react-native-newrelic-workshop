import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native';
import newrelic from 'newrelic-react-native-agent';

export default class FormWithButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: 'this is a ',
      responseText: '',
    };
  }

  handleInputChange = inputText => {
    this.setState({ inputText });
  };

  handleButtonPress = async () => {
    try {
      const interactionId = await newrelic.startInteraction('StartOpenAiCall');
      const response = await fetch('http://192.168.1.11:3000/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: this.state.inputText,
        }),
      });
      const responseJson = await response.json();
      newrelic.endInteraction(interactionId);
      this.setState({ responseText: responseJson.result });
    } catch (error) {
        Alert.alert('Error', error.message);
        console.log('responseJson', responseJson)
    }
  };

  render() {
    return (
        <View className="flex-1 items-center justify-center">
            <TextInput
                className="border p-5 w-1/2 rounded-lg"
                placeholder="Enter text"
                value={this.state.inputText}
                onChangeText={this.handleInputChange}
            />
            <Button title="Submit" onPress={this.handleButtonPress} />
            {this.state.responseText ? <ScrollView>{this.state.responseText}</ScrollView> : null}
      </View>
    );
  }
}
