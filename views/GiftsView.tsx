import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import UserSettings from '../data/UserSettings';
import BackButtonPrevPage from '../data/BackButtonPrevPage';
import Emit from '../data/Emit';
import Page from '../models/Page';


function GiftsView() {
    return (
        <View style={styles.profileViewBlock}>
            <View style={styles.loginTitleBlock}>
                <View style={styles.loginWithBackButtonBlock}>
                    <TouchableOpacity activeOpacity={0.5} onPress={(e) => { Emit.emit('routerSetPage', Page.PROFILE); }} style={styles.backButton}>
                        <Text style={styles.backButtonTitle}>{'<'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { }} style={styles.logoWithBackTextBlock}>
                    <Text style={{ ...styles.appTitle, ...{ color: UserSettings.theme } }}>Lover</Text>
                    <Text style={{ ...styles.appTitle, ...{ color: '#9e9ea3' } }}>Note</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.profileContentBlock}></ScrollView>
            <TouchableOpacity activeOpacity={0.5} onPress={() => { }} style={styles.addButtonBlock}>
                <View style={styles.addButtonTitlesBlock}>
                    <View><Text style={styles.addText}>добавить</Text></View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    modalAddButtonBlock: {
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        height: '30%',
        backgroundColor: UserSettings.theme,
        justifyContent: 'center'
    },
    modalContent: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    modalInput: {
        height: 50,
        borderRadius: 5,
        borderColor: '#9e9ea3',
        borderWidth: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        fontSize: 20,
        color: UserSettings.theme
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        marginTop: '5%'
    },
    infoRowCell: {
        width: '48%',
        height: 120,
        borderRadius: 10,
        backgroundColor: UserSettings.theme,
        borderWidth: 2,
        borderColor: UserSettings.theme
    },
    profileViewBlock: {
        flex: 1,
        justifyContent: 'space-between'
    },
    loginTitleBlock: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginWithBackButtonBlock: {
        flex: 0.2,
    },
    backButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#9e9ea3'
    },
    logoWithBackTextBlock: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: '15%'
    },
    profileContentBlock: {
        flex: 1
    },
    appTitle: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    addButtonBlock: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: UserSettings.theme,
        borderRadius: 10
    },
    addButtonTitlesBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    plusText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    profileNameBlock: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    profileNameText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#9e9ea3',
        fontWeight: 'bold',
    },
    profileValueText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#9e9ea3',
        fontWeight: 'bold',
        marginTop: '2.5%'
    },
    profileKeyText: {
        textAlign: 'center',
        fontSize: 20,
        color: UserSettings.theme,
        fontWeight: 'bold',
    },
    photoBlock: {
        flex: 1,
        width: '100%',
        height: 150,
        marginTop: 10,
    }
});

export default GiftsView;