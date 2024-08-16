// useFonts.js

import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';

export default function useFonts() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            'GothicA1-300': require('./../../assets/fonts/Gothic_A1/GothicA1-Light.ttf'),
            'GothicA1-400': require('./../../assets/fonts/Gothic_A1/GothicA1-Regular.ttf'),
            'GothicA1-500': require('./../../assets/fonts/Gothic_A1/GothicA1-Medium.ttf'),
            'GothicA1-600': require('./../../assets/fonts/Gothic_A1/GothicA1-SemiBold.ttf'),
            'GothicA1-700': require('./../../assets/fonts/Gothic_A1/GothicA1-Bold.ttf'),
            'GothicA1-800': require('./../../assets/fonts/Gothic_A1/GothicA1-ExtraBold.ttf'),
            'GothicA1-900': require('./../../assets/fonts/Gothic_A1/GothicA1-Black.ttf'),

            'Roboto-300' : require('./../../assets/fonts/Roboto/Roboto-Light.ttf'),
            'Roboto-400' : require('./../../assets/fonts/Roboto/Roboto-Regular.ttf'),
            'Roboto-500' : require('./../../assets/fonts/Roboto/Roboto-Medium.ttf'),
            'Roboto-700' : require('./../../assets/fonts/Roboto/Roboto-Bold.ttf'),
            'Roboto-900' : require('./../../assets/fonts/Roboto/Roboto-Black.ttf'),
        });
        setFontsLoaded(true);
    };

    useEffect(() => {
        loadFonts();
    }, []);

    return fontsLoaded;
}
