import React from 'react';
import {View, Text, StyleSheet, Animated, PanResponder} from 'react-native';
import Card from './Card';

class CardStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      pos: new Animated.ValueXY(),
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.state.pos.setValue({x: gestureState.dx, y: gestureState.dy});
        this.setState(this.state);
      },
      onPanResponderRelease: () => {
        const target = this.state.pos.y;
        if (this.state.pos.x.__getValue() > 120) {
          Animated.timing(
            this.state.pos, // Auto-multiplexed
            {toValue: {x: 600, y: target}, duration: 100}, // Back to zero
          ).start();
          setTimeout(() => {
            this.state.users.push(this.state.users.shift());
            this.state.pos.setValue({x: 0, y: 0});
            this.setState(this.state);
          }, 100);
	  } else if (this.state.pos.x.__getValue() < -120) {
			Animated.timing(
			  this.state.pos, // Auto-multiplexed
			  {toValue: {x: -600, y: target}, duration: 50}, // Back to zero
			).start();
			setTimeout(() => {
			  this.state.users.push(this.state.users.shift());
			  this.state.pos.setValue({x: 0, y: 0});
			  this.setState(this.state);
			}, 100);
        } else {
          Animated.spring(
            this.state.pos, // Auto-multiplexed
            {toValue: {x: 0, y: 0}}, // Back to zero
          ).start();
        }
      },
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {this.state.users
          .map((item, i) => {
            if (i == 0) {
              return (
                <Card
                  events={this.panResponder.panHandlers}
                  transform={[
                    {translateX: this.state.pos.x},
                    {translateY: this.state.pos.y},
                    {
                      rotateZ:
                        this.state.pos.x
                          .interpolate({
                            inputRange: [-120, 120],
                            outputRange: [-8, 8],
                          })
                          .__getValue() + 'deg',
                    },
                  ]}
                  user={item}
                  key={i}
                  opacity={1}
                />
              );
            }
            return (
              <Card
                user={item}
                key={i}
                transform={[
                  {
                    scale: this.state.pos.x.interpolate({
                      inputRange: [-200, 0, 200],
                      outputRange: [1, 0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
                opacity={this.state.pos.x.interpolate({
                  inputRange: [-400, 0, 400],
                  outputRange: [1, 0, 1],
                  extrapolate: 'clamp',
                })}
              />
            );
          })
          .reverse()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default CardStack;
