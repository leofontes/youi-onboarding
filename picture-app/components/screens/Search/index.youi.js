import React, { Component, createRef } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { FocusManager } from '@youi/react-native-youi';
import Colors from '../../../utils/colors';
import Button from '../../atoms/Button.youi';
import { search } from '../../../api/image';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            error: false
        }

    }

    inputRef = createRef()

    componentDidMount() {
        console.log('this')
        FocusManager.focus(this.inputRef.current);
    }

    onChangeText = (search) => {
        this.setState({
            search: search,
            error: false
        })
    }

    onSearchClick = async () => {
        const searchResult = await search(this.state.search);
        if (searchResult && searchResult.total > 0) {
            await this.props.navigation.navigate('Results', {
                searchResult
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.centerContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            ref={this.inputRef}
                            autoFocus={true}
                            onChangeText={this.onChangeText}
                            style={styles.searchInput}
                            value={this.state.search}
                            textAlign="center"
                            placeholder="Find your image"
                            onSubmitEditing={() => this.onSearchClick()}
                        />
                    </View>
                    <Button label="Search" onPress={this.onSearchClick}  />
                    <Text style={styles.errorLabel}>
                        {this.state.error ? 'No results found' : ''}
                    </Text>
                    {/*<Button label="Video" onPress={() => this.props.navigation.navigate('Playback')} />*/}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
       alignItems: 'center',
       backgroundColor: Colors.gray_f8,
       flex: 1,
       justifyContent: 'center'
    },
    centerContainer: {
        marginHorizontal: 100
    },
    searchInputContainer: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginBottom: 10,
        padding: 3,
    },
    searchInput: {
        backgroundColor: Colors.white,
        fontSize: 46,
        height: 92,
        padding: 0,
        textAlign: 'center'
    },
    errorLabel: {
        color: Colors.red,
        fontSize: 32,
        textAlign: 'center',
    }
});
