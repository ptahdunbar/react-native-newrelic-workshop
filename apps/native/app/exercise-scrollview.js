import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default class InefficientScrollView extends Component {
  render() {
    const items = Array.from({ length: 1000 }, (_, index) => (
      <View className="w-full h-4 my-5 bg-red-700" key={index}>
        <Text className="text-white font-bold text-center">Box {index + 1}</Text>
      </View>
    ));

    return (
      <View className="flex-1 items-center justify-center">
        <ScrollView className="w-full">{items}</ScrollView>
      </View>
    );
  }
}