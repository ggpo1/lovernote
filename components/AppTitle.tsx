import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import UserSettings from '../data/UserSettings';

function AppTitle() {
    return (
        <View style={styles.appTitleWrapper}>
            <Text style={{ ...styles.appTitle, ...{ color: UserSettings.theme  } }}>Lover</Text>
            <Text style={{ ...styles.appTitle, ...{ color: '#9e9ea3' } }}>Note</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    appTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    appTitle: {
        fontSize: 35,
        fontWeight: 'bold',
    }
});

export default AppTitle;