import React, { useState } from 'react';
import { useFonts } from '@use-expo/font';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    SafeAreaView,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import Profile from '../models/Profile';
import Emit from '../data/Emit';
import * as FileSystem from 'expo-file-system';
import { LoadCounter } from '../data/LoadCounter';
import UserSettings from '../data/UserSettings';

interface LoginViewProps {
    source: Array<Profile>
}

function LoginView(props: LoginViewProps) {
    const [source, setSource] = useState<typeof props.source>(props.source),
        [addProfileModalVisible, setAddProfileModalVisible] = useState<boolean>(false),
        [newProfileNameValue, setNewProfileNameValue] = useState<string>('');

    if (Emit.listeners('loginViewSetSource').length === 0)
        Emit.addListener('loginViewSetSource', (newSource) => {
            console.log('updating source');
            setSource(newSource)
        });

    let profileElements: Array<JSX.Element> = [];
    // profile component
    try {
        source.forEach((el: Profile, i: number) => profileElements.push(
            <TouchableHighlight activeOpacity={0} key={`profile_${i}_${el.id}`} onPress={(e) => { Emit.emit('routerSetPage', 1, el.id); }} style={styles.profileRow}>
                <View style={styles.profileRowView}>
                    <View style={styles.profileLogoBlock}>
                        <View style={styles.photoView}>
                            <Image
                                style={{ width: '100%', height: '100%', borderRadius: 10, opacity: 0.8 }}
                                // source={el.photo}
                                source={require('../assets/profilePhoto.jpg')}// TODO: save image to data.json
                            />
                        </View>
                    </View>
                    <View style={styles.profileSmallInfoBlock}>
                        <Text style={styles.infoText}>{el.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        ));
    } catch (e) {

    }
    return (
        <SafeAreaView style={styles.loginViewWrapper}>
            <View style={styles.loginTitleBlock}>
                <Text style={{ ...styles.appTitle, ...{ color: UserSettings.theme  } }}>Lover</Text>
                <Text style={{ ...styles.appTitle, ...{ color: '#9e9ea3' } }}>Note</Text>
            </View>
            <ScrollView style={styles.loginControlsBlock}>
                {profileElements}
            </ScrollView>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setAddProfileModalVisible(!addProfileModalVisible)} style={styles.addButtonBlock}>
                <View style={styles.addButtonTitlesBlock}>
                    <View><Text style={styles.addText}>добавить</Text></View>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addProfileModalVisible}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        height: 400,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderWidth: 4,
                        borderColor: UserSettings.theme,
                        borderBottomColor: 'white',
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setAddProfileModalVisible(!addProfileModalVisible);
                            }}
                            activeOpacity={0.5}
                            style={{
                                width: '100%',
                                height: '10%',
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10
                            }}
                        >
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/modalClose.png')}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.modalContent}>
                            <View key={'addModal_inputsBlock'} style={{ height: '50%' }}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder={'Имя'}
                                    onChangeText={value => setNewProfileNameValue(value)}
                                    value={newProfileNameValue}
                                />
                            </View>
                            <View key={'addModal_addButton'} style={{ height: '40%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { }} activeOpacity={0.5} style={styles.modalAddButtonBlock}>
                                    <View><Text style={styles.addText}>добавить</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default LoginView;

const styles = StyleSheet.create({
    modalAddButtonBlock: {
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        height: '30%',
        backgroundColor: UserSettings.theme,
        justifyContent: 'center'
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
        // fontWeight: 'bold'
    },
    addButtonTitlesBlock: {
        // width: '35%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    modalContent: {
        width: '100%',
        height: '100%',
        // justifyContent: 'space-around',
        padding: 10
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    addButtonBlock: {
        flex: 0.135,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#90ee90',
        backgroundColor: UserSettings.theme,
        borderRadius: 10,
        marginTop: 15,
    },
    loginViewWrapper: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    loginTitleBlock: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        // backgroundColor: 'red',
    },
    loginControlsBlock: {
        flex: 1,
        paddingTop: '10%',
        marginVertical: 5,
        // backgroundColor: 'purple'
    },
    appTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        // fontFamily: 'Bree'
    },
    profileRow: {
        // outline: 'none',
        height: 120,
        // height: 100,
        paddingTop: '1%',
        // backgroundColor: 'red',
    },
    profileRowView: {
        height: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#dbdbdb'
    },
    text: {
        fontSize: 42,
    },
    profileLogoBlock: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: '5%',
        // backgroundColor: 'purple'
    },
    photoView: {
        width: '75%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderColor: '#a8a8a8',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: 'white',

    },
    photoText: {
        fontWeight: 'bold',
        color: '#ff8fa2',
    },
    infoText: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'grey',
    },
    profileSmallInfoBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    }
});