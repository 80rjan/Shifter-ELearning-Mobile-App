import React from 'react';
import Svg, { Path, G, Polyline } from 'react-native-svg';
import {usePerson} from "../app/PersonInformationContext";

const ShifterMiniLogo = ({ width, height, color}) => {
    const { lightTheme } = usePerson();

    return(
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 34.613" width={width} height={height}>
            <G>
                <Polyline points="0 17.268 17.118 34.613 17.12 25.177 32.133 25.177 32.133 9.442 17.122 9.444 17.124 0 0 17.268"
                          fill="#00b5f0"/>
                <G opacity={lightTheme ? 0.2 : 0.1}>
                    <Polyline points="70 17.346 52.882 0 52.88 9.436 37.867 9.437 37.867 25.172 52.878 25.17 52.876 34.613 70 17.346"
                              fill="#00b5f0"
                    />
                </G>
            </G>
        </Svg>
    );
}

export default ShifterMiniLogo;
