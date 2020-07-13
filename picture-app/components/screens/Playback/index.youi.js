import React, { Component, createRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Composition, VideoRef, TimelineRef, ViewRef, TextRef, ButtonRef, Input } from '@youi/react-native-youi'
import { parseDurationFromMS } from '../../../utils/time'

export default class PlaybackScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            duration: 0,
            paused: true
        }
    }

    videoRef = createRef()

    playbackControlsInTimelineRef = createRef()
    playbackControlsOutTimelineRef = createRef()
    containerPlayPauseInTimelineRef = createRef()
    containerPlayPauseOutTimelineRef = createRef()
    playPauseToggleOnTimelineRef = createRef()
    playPauseToggleOffTimelineRef = createRef()
    backButtonInTimelineRef = createRef()
    backButtonOutTimelineRef = createRef()
    scrollStartTimelineRef = createRef()

    componentDidMount() {
        Input.addEventListener('Space', this.handleKeyDown)
    }

    componentWillUnmount() {
        Input.removeEventListener('Space', this.handleKeyDown)
    }

    handleKeyDown = (keyEvent) => {
        const { keyCode } = keyEvent

        switch (keyCode) {
            case 'Space':
                this.onPlayPauseButtonPress()
                break
        }
    }

    onVideoError = (error) => {
        console.log('error occurred')
        console.log(error)
    }

    handleControlsVisibility = (makeVisible) => {
        if (makeVisible) {
            this.playbackControlsInTimelineRef.current.play()
            this.containerPlayPauseInTimelineRef.current.play()
            this.backButtonInTimelineRef.current.play()
        } else {
            this.playbackControlsOutTimelineRef.current.play()
            this.containerPlayPauseOutTimelineRef.current.play()
            this.backButtonOutTimelineRef.current.play()
        }
    }

    onBackButtonPress = () => {
        this.props.navigation.goBack()
    }

    onPlayPauseButtonPress = () => {
        const { paused } = this.state

        if (paused) {
            this.videoRef.play()
            this.playPauseToggleOnTimelineRef.current.play()
        } else {
            this.videoRef.pause()
            this.playPauseToggleOffTimelineRef.current.play()
        }
    }

    onPreparing = () => {
        console.log("onPreparing called.")
    }

    onReady = () => {
        console.log("onReady called.")
        this.videoRef.play()
        this.setState({ paused: false })
        this.playPauseToggleOnTimelineRef.current.play()
        this.handleControlsVisibility(true)
    }

    onPlaying = () => {
        console.log("onPlaying called.");
        this.setState({ paused: false });
        setTimeout(() => {
            if (!this.state.paused) {
                this.handleControlsVisibility(false)
            }
        }, 5000)
    }

    onPaused = () => {
        console.log("onPaused called.");
        this.setState({ paused: true });
        this.handleControlsVisibility(true)
    }

    onCurrentTimeUpdated = (currentTime) => {
        this.setState({
            currentTime: currentTime
        })
        this.scrollStartTimelineRef.current.seek(currentTime / this.state.duration)
    }

    onDurationChanged = (duration) => {
        this.setState({
            duration: duration
        })
    }

    render() {
        const { currentTime, duration } = this.state

        return (
            <View>
                <View style={styles.videoContainer}>
                    <Composition source="Player_VideoRef">
                        <VideoRef
                            name="Video-Surface-View"
                            source={{
                                uri: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
                                type: 'HLS'
                            }}
                            onErrorOccurred={this.onVideoError}
                            ref={(ref) => {this.videoRef = ref}}
                            onPreparing={this.onPreparing}
                            onReady={this.onReady}
                            onPlaying={this.onPlaying}
                            onPaused={this.onPaused}
                            onCurrentTimeUpdated={this.onCurrentTimeUpdated}
                            onDurationChanged={this.onDurationChanged}
                        />
                    </Composition>
                </View>
                <View style={styles.controlsContainer}>
                    <Composition source="Player_Playback-Controls">
                        <TimelineRef name="In" ref={this.playbackControlsInTimelineRef} />
                        <TimelineRef name="Out" ref={this.playbackControlsOutTimelineRef} />
                        <ViewRef name="Btn-Back-Container">
                            <TimelineRef name="In" ref={this.backButtonInTimelineRef} />
                            <TimelineRef name="Out" ref={this.backButtonOutTimelineRef} />
                            <ButtonRef name="Btn-Back" onPress={this.onBackButtonPress} />
                        </ViewRef>
                        <TextRef
                            name="Placeholder-Time"
                            text={`${parseDurationFromMS(currentTime)}/${parseDurationFromMS(duration)}`}
                        />
                        <ViewRef name="Player-Scrubber">
                            <ViewRef name="Player-ScrollBar">
                                <TimelineRef name="ScrollStart" ref={this.scrollStartTimelineRef} />
                            </ViewRef>
                        </ViewRef>
                        <ViewRef name="PlayPause-Container">
                            <TimelineRef name="In" ref={this.containerPlayPauseInTimelineRef} />
                            <TimelineRef name="Out" ref={this.containerPlayPauseOutTimelineRef} />
                            <ButtonRef name="Btn-PlayPause" onPress={this.onPlayPauseButtonPress}>
                                <TimelineRef name="Toggle-On" ref={this.playPauseToggleOnTimelineRef} />
                                <TimelineRef name="Toggle-Off" ref={this.playPauseToggleOffTimelineRef} />
                            </ButtonRef>
                        </ViewRef>
                    </Composition>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    videoContainer: {
        position: 'absolute'
    },
    controlsContainer: {
        position: 'absolute',
        zIndex: 999999
    }
})
