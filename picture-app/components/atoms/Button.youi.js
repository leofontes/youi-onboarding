import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/colors'

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text style={styles.label}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.blue,
        borderRadius: 8,
        justifyContent: 'center',
        paddingVertical: 8,
    },
    label: {
        color: Colors.white,
        fontSize: 32,
    }
});
