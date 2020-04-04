import React, {Component} from 'react';
import {Animated, PanResponder, Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

class ParallaxSwipeView extends Component {
    current = 0;
    translateX = new Animated.Value(0);
    relativeX = new Animated.Value(0);

    state = {
        current: 0,
    };

    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
            let offsetX = this.current + this.offsetX(gesture.dx);

            if (offsetX <= 0 && offsetX >= -2) {
                this.translateX.setValue(offsetX);
                this.relativeX.setValue(Math.abs(this.offsetX(gesture.dx)));
            }
        },
        onPanResponderRelease: (e, gesture) => {
            let offsetX = this.offsetX(gesture.dx);
            let value = 0;

            if (offsetX >= 0.33) {
                value = 1;
            }

            if (offsetX <= -0.33) {
                value = -1;
            }

            this.move(value)
        }
    });

    offsetX(x) {
        return x / width;
    }

    move(value) {
        let newCurrent = this.current + value;
        let screenCount = this.props.screens.length;

        if (newCurrent >= 0) {
            newCurrent = 0
        }

        if (newCurrent <= -(screenCount - 1)) {
            newCurrent = -(screenCount - 1)
        }

        this.current = newCurrent;
        this.setState({current: newCurrent});

        Animated.timing(
            this.translateX,
            {
                toValue: this.current,
                duration: 250,
                // useNativeDriver: true,
            }
        ).start();

        Animated.timing(
            this.relativeX,
            {
                toValue: 0,
                duration: 250,
                // useNativeDriver: true,
            }
        ).start();
    }

    render() {
        let state = {
            current: this.state.current,
            translateX: this.translateX,
            relativeX: this.relativeX,
            move: this.move.bind(this),
        };
        let screens = this.props.screens.map(f => f(state));
        let screenCount = screens.length;
        let bottomView = null;
        const translateX = this.translateX.interpolate({
            inputRange: [0, screenCount],
            outputRange: [0, width * screenCount],
        });

        if (this.props.bottomView) {
            bottomView = this.props.bottomView(state)
        }

        return <Animated.View
            {...this.panResponder.panHandlers}
            style={[
                styles.container,
                {width: width * screenCount},
            ]}
        >
            <Animated.View style={{
                position: 'absolute',
                height: '100%',
                width: width * screenCount,
                transform: [{translateX}],
                flexDirection: 'row',
            }}>
                {screens}
            </Animated.View>

            {bottomView}

        </Animated.View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ParallaxSwipeView;
