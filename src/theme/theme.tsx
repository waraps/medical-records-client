import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    fonts: {
        heading: '\'Poppins\', sans-serif',
        body: '\'Poppins\', sans-serif',
    },
    colors: {
        primary: {
            50: '#ececff',
            100: '#cacaeb',
            200: '#a7a7d8',
            300: '#8384c7',
            400: '#6161b7',
            500: '#47489d',
            600: '#37387b',
            700: '#272858',
            800: '#161837',
            900: '#070718',
        },
        secondary: {
            50: '#e8f7ec',
            100: '#cfdfd1',
            200: '#b4cab5',
            300: '#98b399',
            400: '#7c9d7d',
            500: '#628363',
            600: '#4b664c',
            700: '#344936',
            800: '#1e2d1e',
            900: '#031103',
        }
    }
});
