import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default class EfficientFlatList extends PureComponent {
  renderBox = ({ item }) => (
    <View className="w-full h-4 my-5 bg-red-700">
      <Text className="text-white font-bold text-center">{item}</Text>
    </View>
  );

  render() {
    const data = Array.from({ length: 100000 }, (_, index) => `Box ${index + 1}`);

    return (
      <View className="flex-1 items-center justify-center">
        <FlatList
          className="w-full"
          data={data}
          renderItem={this.renderBox}
          keyExtractor={(_, index) => `${index}`}
        />
      </View>
    );
  }
}
