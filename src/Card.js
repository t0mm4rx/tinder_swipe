import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

class Card extends React.Component {
  render() {
	  console.log(this.props.user);
    return (
      <Animated.View
        {...this.props.events}
        style={{...styles.wrapper, ...{transform: this.props.transform, opacity: this.props.opacity}}}>
        <Image
          source={{uri: this.props.user.url}}
          style={styles.image}
          key={Math.random().toString()}
        />
        <View style={styles.info}>
          <Text style={styles.age}>{this.props.user.age}</Text>
          <Text style={styles.name}>{this.props.user.name}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    flex: 1,
    padding: 40,
    height: 600,
    width: Dimensions.get('window').width,
  },
  image: {
    flex: 1,
    width: null,
    height: 600,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  info: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    margin: 40,
  },
  age: {
    fontSize: 25,
    color: '#fff',
  },
  name: {
    fontSize: 25,
    color: '#fff',
  },
});

export default Card;
