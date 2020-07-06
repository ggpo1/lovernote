import React, { useState, useEffect } from 'react';
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
    TouchableOpacity,
    Picker
} from 'react-native';
import Constants from 'expo-constants';
import Profile from '../models/Profile';
import Emit from '../data/Emit';
import * as FileSystem from 'expo-file-system';
import { LoadCounter } from '../data/LoadCounter';
import UserSettings from '../data/UserSettings';
import AppTitle from '../components/AppTitle';
import UserThemes from '../data/UserThemes';
import Page from '../models/Page';
import FileDataOperations from './../data/FileDataOperations';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

interface LoginViewProps {
    source: Array<Profile>
}

function LoginView(props: LoginViewProps) {
    const [source, setSource] = useState<typeof props.source>(props.source),
        [addProfileModalVisible, setAddProfileModalVisible] = useState<boolean>(false),
        [isSettingsModalVisible, setIsSettingsModalVisible] = useState<boolean>(false),
        [newProfileNameValue, setNewProfileNameValue] = useState<string>(''),
        [newProfilePhoto, setNewProfilePhoto] = useState<any>(undefined),
        [selectedTheme, setSelectedTheme] = useState<string>(UserSettings.theme);

    // const SampleComponent = () => {
    //     useEffect(() => {
    //         getPermissionAsync();
    //     }, [])


        let getPermissionAsync = async () => {
            if (Constants.platform!.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        };

        let _pickImage = async () => {
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true
                });
                if (!result.cancelled) {
                    setNewProfilePhoto(result)
                }

            } catch (E) {
                console.log(E);
            }
        };


        let pickPhotoAction = () => {
            getPermissionAsync();
            _pickImage();
        }

        if (Emit.listeners('loginViewSetSource').length === 0)
            Emit.addListener('loginViewSetSource', (newSource) => setSource(newSource));

        let profileElements: Array<JSX.Element> = [];

        let colorsItems: Array<JSX.Element> = [];
        if (isSettingsModalVisible) {
            UserThemes.forEach(el => colorsItems.push(
                <Picker.Item key={`${el.title}_${el.key}`} color={el.color} label={el.title} value={el.color} />
            ));
        }

        let addProfileClick = () => {
            let maxID = source[0] === undefined ? -100 : source[0].id;
            source.forEach(el => el.id > maxID && (maxID = el.id));
            let _source = source;
            let newProfile: Profile = {
                id: maxID + 1,
                name: newProfileNameValue,
                photo: newProfilePhoto.base64, 
                rows: []
            }
            _source.push(newProfile);
            FileDataOperations.ClearData();
            FileDataOperations.SaveData(_source);
            setSource(_source);
            setAddProfileModalVisible(false);
        };

        // profile component
        try {
            source.forEach((el: Profile, i: number) => profileElements.push(
                <TouchableOpacity activeOpacity={0.5} key={`profile_${i}_${el.id}`} onPress={(e) => { Emit.emit('routerSetPage', Page.PROFILE, el.id); }} style={styles.profileRow}>
                    <View style={styles.profileRowView}>
                        <View style={styles.profileLogoBlock}>
                            <View style={styles.photoView}>
                                <Image
                                    style={{ width: '100%', height: '100%', borderRadius: 10, opacity: 0.8 }}
                                    // source={el.photo}
                                    // source={require('../assets/profilePhoto.jpg')}// TODO: save image to data.json
                                    source={{uri: `data:image/jpeg;base64,${el.photo}`}}
                                />
                            </View>
                        </View>
                        <View style={styles.profileSmallInfoBlock}>
                            <Text style={styles.infoText}>{el.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ));
        } catch (e) {
            console.log('Error while profile parsing');
        }
        return (
            <SafeAreaView style={styles.loginViewWrapper}>
                <View style={styles.loginTitleBlock}>
                    {/* <Text style={{ ...styles.appTitle, ...{ color: UserSettings.theme  } }}>Lover</Text> */}
                    {/* <Text style={{ ...styles.appTitle, ...{ color: '#9e9ea3' } }}>Note</Text> */}
                    <AppTitle />
                </View>
                <ScrollView style={styles.loginControlsBlock}>
                    {profileElements}
                </ScrollView>
                <TouchableOpacity activeOpacity={0.5} onPress={() => { setNewProfileNameValue(''); setAddProfileModalVisible(!addProfileModalVisible) }} style={styles.addButtonBlock}>
                    <View style={styles.addButtonTitlesBlock}>
                        <View><Text style={styles.addText}>добавить</Text></View>
                    </View>
                </TouchableOpacity>
                {/* Settings button */}
                <TouchableOpacity activeOpacity={0.5} onPress={() => setIsSettingsModalVisible(!isSettingsModalVisible)} style={{
                    flex: 0.07,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <View style={styles.addButtonTitlesBlock}>
                        <View><Text style={{
                            color: '#9e9ea3',
                            fontSize: 17,
                            textDecorationLine: 'underline'
                        }}>настройки</Text></View>
                    </View>
                </TouchableOpacity>
                {/* ADD MODAL */}
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
                                    setAddProfileModalVisible(false);
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
                                    <TouchableOpacity
                                        style={styles.modalInput}
                                        onPress={() => pickPhotoAction()}
                                    >
                                        <View style={{ height: '100%', justifyContent: 'center' }}>
                                            <Text style={{
                                                fontSize: 20,
                                                color: UserSettings.theme
                                            }}>
                                                Выбрать фото
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View key={'addModal_addButton'} style={{ height: '40%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { addProfileClick() }} activeOpacity={0.5} style={styles.modalAddButtonBlock}>
                                        <View><Text style={styles.addText}>добавить</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* SETTINGS MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isSettingsModalVisible}
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
                                    setIsSettingsModalVisible(false);
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
                                    <Picker
                                        selectedValue={selectedTheme}
                                        onValueChange={(itemValue, itemIndex) => { UserSettings.theme = itemValue; setSelectedTheme(itemValue); Emit.emit('forceUpdateEmit') }}
                                    >
                                        {colorsItems}
                                    </Picker>
                                </View>
                                <View key={'addModal_addButton'} style={{ height: '40%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => { }} activeOpacity={0.5} style={styles.modalAddButtonBlock}>
                                        <View><Text style={styles.addText}>применить</Text></View>
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
        },
        addButtonTitlesBlock: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        modalContent: {
            width: '100%',
            height: '100%',
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
            justifyContent: 'center',
        },
        loginControlsBlock: {
            flex: 1,
            paddingTop: '10%',
            marginVertical: 5,
        },
        profileRow: {
            height: 120,
            paddingTop: '1%',
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
            color: 'grey',
        },
        profileSmallInfoBlock: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });