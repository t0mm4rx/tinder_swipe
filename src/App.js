import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardStack from './CardStack';
import getUsers from './users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.users = getUsers();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CardStack users={this.users} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
