import moment from 'moment'

export const parseDurationFromMS = (duration) => {
    const hours = moment.duration(duration).hours()
    const minutes = moment.duration(duration).minutes()
    let minutesString = `${minutes}`
    if (minutes === 0) {
        minutesString = '00'
    }
    const seconds = moment.duration(duration).seconds()
    let secondsString = `${seconds}`
    if (seconds === 0) {
        secondsString = '00'
    }

    if (hours !== 0) {
        if (hours < 10) {
            return `0${hours}:${minutesString}:${secondsString}`
        }
        return `${hours}:${minutesString}:${secondsString}`
    }
    return `${minutesString}:${secondsString}`
}
