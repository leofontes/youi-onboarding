import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import Colors from '../../utils/colors'

export default class GalleryItem extends Component {
    render() {
        const { urls, description } = this.props.item
        const { raw, full, regular, small, thumb } = urls
        const dimension = (Dimensions.get('window').width - 32) / 4;

        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View
                    style={[styles.mainContainer, { backgroundColor: this.props.selected ? Colors.blue : undefined }]}
                >
                    <Image
                        source={{uri: thumb}}
                        style={[styles.thumb, { height: dimension, width: dimension }]}
                    />
                    <Text style={[styles.description, { width: dimension }]}>{description}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        borderColor: Colors.blue,
        borderWidth: 1,
        borderRadius: 8,
        flex: 1,
        flexBasis: 0,
        margin: 4,
        paddingVertical: 4,
    },
    thumb: {

    },
    description: {
        color: Colors.black,
        flex: 1,
        paddingHorizontal: 4,
        textAlign: 'center'
    }
})
