import {
    Dimensions,
    Platform
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const CURRENT_PLATFORM = Platform.OS;

module.exports = {
    BASEURL: 'http://localhost:3001/',
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    CURRENT_PLATFORM,
}
