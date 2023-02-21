import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Alert, ScrollView, Text } from 'react-native';

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
    // TODO
    // take the input text and post to the /openai endpoint.
    // the endpoint will return a response with the result.
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
