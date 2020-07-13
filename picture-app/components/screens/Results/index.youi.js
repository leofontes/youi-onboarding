import React, { Component, createRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Input } from "@youi/react-native-youi"
import Colors from '../../../utils/colors'
import GalleryItem from '../../atoms/GalleryItem.youi'

const keys = ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export default class ResultsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResult: props.navigation.getParam('searchResult', undefined),
            selectedIndex: 0
        }
    }

    listRef = createRef()

    componentDidMount() {
        keys.forEach((key) => {
            Input.addEventListener(key, this.handleKeyDown)
        })
    }

    componentWillUnmount() {
        keys.forEach((key) => {
            Input.removeEventListener(key, this.handleKeyDown)
        })
    }

    renderItem = ({ item, index }) => {
        return (
            <GalleryItem
                item={item}
                selected={this.state.selectedIndex === index}
                onPress={() => this.onItemPress(index)}
            />
        )
    }

    handleKeyDown = (keyEvent) => {
        const { keyCode, eventType } = keyEvent
        const { selectedIndex } = this.state

        console.log(eventType)

        if (eventType === 'up') {
            switch (keyCode) {
                case 'ArrowUp':
                    this.updateSelectedIndex(selectedIndex - 4)
                    break
                case 'ArrowDown':
                    this.updateSelectedIndex(selectedIndex + 4)
                    break
                case 'ArrowLeft':
                    this.updateSelectedIndex(selectedIndex - 1)
                    break
                case 'ArrowRight':
                    this.updateSelectedIndex(selectedIndex + 1)
                    break
                case 'Space':
                    this.props.navigation.navigate('Playback')
                    break
            }
        }
    }

    updateSelectedIndex = (newIndex) => {
        const { searchResult, selectedIndex } = this.state

        if (newIndex < 0) {
            this.setState({ selectedIndex: 0 })
        } else if (newIndex >= searchResult.results.length) {
            this.setState({ selectedIndex: searchResult.results.length - 1 })
        } else {
            this.setState({ selectedIndex: newIndex })
        }
    }

    onItemPress = (index) => {
        this.setState({ selectedIndex: index })
        this.props.navigation.navigate('Playback')
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.state.searchResult.results}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                    numColumns={4}
                    extraData={this.state.selectedIndex}
                    ref={this.listRef}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.gray_f8
    }
})
