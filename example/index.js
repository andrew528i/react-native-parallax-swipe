import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ParallaxSwipeView from 'react-native-parallax-swipe';

const {width} = Dimensions.get('window');

class WelcomeScreen extends Component {

    renderDots({current}) {
        let dots = [];

        for (let i = 0; i < 3; i += 1) {
            let dotStyles = [styles.paginationDot];

            if (current === -i) {
                dotStyles.push(styles.paginationDotActive)
            }

            dots.push(<View key={'dot_' + i} style={dotStyles} />)
        }

        return <View style={styles.paginationDots}>
            {dots}
        </View>
    }

    renderBottom({current, translateX, move}) {
        const backgroundColor = translateX.interpolate({
            inputRange: [-2, -1, 0],
            outputRange: ['rgba(255,128,0,1)', 'rgba(28,125,208,1)', 'rgba(255,61,200,1)'],
        });

        const buttonColor = translateX.interpolate({
            inputRange: [-2, -1, 0],
            outputRange: ['rgba(255,61,200,1)', 'rgba(134,250,79,1)', 'rgba(57,55,208,1)'],
        });

        const buttonTextColor = translateX.interpolate({
            inputRange: [-2, -1, 0],
            outputRange: ['rgba(252,253,84,1)', 'rgba(235,83,195,1)', 'rgba(77,255,15,1)'],
        });

        return <Animated.View style={[styles.paginationContainer, {backgroundColor}]}>
            {this.renderDots({current})}

            {current === 0 && <Text style={styles.title}>
                BLA
                {"\n"}
                <Text style={[styles.title, styles.titleHighlight]}>
                    BLA BLA
                </Text>
                {"\n"}BLA
            </Text>}

            {current === -1 && <Text style={styles.title}>
                HELLO
                {"\n"}
                WORLD
                {"\n"}
                HELLO <Text style={[styles.title, styles.titleHighlight]}>
                WORLD
            </Text>
            </Text>}

            {current === -2 && <Text style={[styles.title, styles.titleHighlight]}>
                BLA BLA BLA
                {"\n"}
                BLA
                {"\n"}
                <Text style={[styles.title, styles.titleHighlight]}>
                    BLA BLA
                </Text>
            </Text>}

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => move(-1)}
            >
                <Animated.View
                    style={[styles.bottomButton, {backgroundColor: buttonColor}]}
                    activeOpacity={1}
                >
                    <Animated.Text
                        style={{
                            color: buttonTextColor,
                            fontFamily: "system",
                            fontSize: 16,
                            lineHeight: 24,
                            fontWeight: "bold",
                        }}
                    >Next</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    }

    renderFirst({translateX}) {
        return <View
            style={{
                width,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orange',
            }}
        >
            <Animated.Text
                style={{
                    fontSize: 34,
                    transform: [{
                        translateY: translateX.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 300],
                        })
                    }],
                }}
            >
                One
            </Animated.Text>
        </View>
    }

    renderSecond({translateX, relativeX}) {
        return <View
            style={{
                width,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
            }}
        >
            <Animated.Text
                style={{
                    fontSize: 34,
                    transform: [{
                        translateY: relativeX.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -300],
                        })
                    }],
                }}
            >
                Jump
            </Animated.Text>
            <Animated.Text
                style={{
                    fontSize: 34,
                    transform: [{
                        translateX: translateX.interpolate({
                            inputRange: [-1, 0],
                            outputRange: [0, 300],
                        })
                    }],
                }}
            >
                Two
            </Animated.Text>
        </View>
    }

    renderThird({translateX}) {
        return <View
            style={{
                width,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'tomato',
            }}
        >
            <Animated.Text
                style={{
                    fontSize: 34,
                    transform: [{
                        scale: translateX.interpolate({
                            inputRange: [-2, -1],
                            outputRange: [1, 3],
                        })
                    }],
                }}
            >
                Three
            </Animated.Text>
        </View>
    }

    render() {
        return <ParallaxSwipeView
            screens={[
                this.renderFirst.bind(this),
                this.renderSecond.bind(this),
                this.renderThird.bind(this),
            ]}
            bottomView={this.renderBottom.bind(this)}
        />;
    }
}

const styles = StyleSheet.create({
    paginationDot: {
        backgroundColor: 'rgba(255, 255, 255, .2)',
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4.5
    },
    paginationDotActive: {
        backgroundColor: '#FFF',
    },
    paginationDots: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width,
        paddingHorizontal: 16,
        paddingBottom: 34,
        paddingTop: 8,
        alignItems: 'stretch',
    },
    title: {
        color: '#FFF',
        fontFamily: "monospace",
        fontSize: 24,
        lineHeight: 29,
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
    },
    titleHighlight: {
        color: '#000000',
    },
    bottomButton: {
        marginTop: 24,
        marginLeft: 72,
        marginRight: 72,
        height: 48,
        borderRadius: 0,
        backgroundColor: '#3937D0',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
    },
    bgImage: {
        flexGrow: 1,
        resizeMode: 'cover',
    },
});

export default WelcomeScreen
