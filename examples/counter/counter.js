import React, {useContext} from 'react';
import {View, Button, Text, TouchableOpacity} from 'react-native';
import {CounterContext} from './store';

export default () => {
  const [counterContext] = useContext(CounterContext);
  let {count} = counterContext.state;

  return (
    <View style={{flex: 1}}>
      <Text style={{marginTop: 30}}>{count}</Text>
      <TouchableOpacity onPress={counterContext.increment}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={counterContext.decrement}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};
