import React, { useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    AsyncStorage
} from 'react-native';
import Emit from '../data/Emit';
import Profile from '../models/Profile';
import * as FileSystem from 'expo-file-system';
import { Linking } from 'expo';
import UserSettings from '../data/UserSettings';
import DropDownMenu from '../components/DropDownMenu';
import BackButtonPrevPage from '../data/BackButtonPrevPage';


interface ProfileViewProps {
    profileId: number,
    fullSource: Array<Profile>
}

function ProfileView(props: ProfileViewProps) {
    let source: Profile = {
        id: 0,
        photo: '',
        name: 'test',
        birth: '',
        rows: []
    };
    const [openedCells, setOpenedCells] = useState<Array<number>>([]),
        [modalVisible, setModalVisible] = useState(false),
        [titleValue, setTitleValue] = useState<string>(''),
        [answerValue, setAnswerValue] = useState<string>(''),
        [fullSource, setFullSource] = useState<typeof props.fullSource>(props.fullSource),
        [profileId] = useState<number>(props.profileId),
        [modalMode, setModalMode] = useState<string>('ADD_MODE'), // INFO_MODE
        [selectedCell, setSelectedCell] = useState<typeof source.rows[0]>(),
        [isDropDownMenu, setIsDropDownMenu] = useState<boolean>(false);

    source = fullSource.filter(el => el.id === profileId)[0];


    if (Emit.listeners('setIsDropDownMenuEmit').length === 0)
        Emit.addListener('setIsDropDownMenuEmit', (is: boolean) => setIsDropDownMenu(is));


    let _handlePress = (url: string) => {
        Linking.openURL(url);
    };

    let openInfoModalAction = (cell: typeof source.rows[0]) => {
        setModalMode('INFO_MODE');
        setSelectedCell(cell);
        setModalVisible(true);
    }

    let addNewQuestionHandle = () => {
        source.rows.push({
            key: `${profileId}_${titleValue}_${answerValue}`,
            type: typeof '',
            title: titleValue,
            value: answerValue
        });
        setModalVisible(!modalVisible);
        for (let i = 0; i < fullSource.length; i++) {
            if (fullSource[i].id === profileId) {
                fullSource[i] = source;
            }
        }
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', '');
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', JSON.stringify(fullSource));
    }

    let removePinAction = () => {
        // console.log('this');
        // console.log(selectedCell);
        // let index = ;
        // console.log(index);
        source.rows.splice(source.rows.indexOf(selectedCell!), 1);
        setModalVisible(!modalVisible);
        for (let i = 0; i < fullSource.length; i++) {
            if (fullSource[i].id === profileId) {
                fullSource[i] = source;
            }
        }
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', '');
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', JSON.stringify(fullSource));
    }

    let infoEls: Array<JSX.Element> = [];
    for (let i = 0; i < source.rows.length; i++) {
        let plusEl;
        if (source.rows[i + 1] !== undefined) {
            plusEl = (
                <TouchableOpacity activeOpacity={0.5} onPress={() => openInfoModalAction(source.rows[i])} style={styles.infoRowCell}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Text style={{ textAlign: 'center', color: '#f8f8ff', fontWeight: 'bold', fontSize: 17 }}>{source.rows[i + 1].title.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        let el = (
            <View key={`infoCell_${i}`} style={styles.infoRow}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => openInfoModalAction(source.rows[i - 1])} style={styles.infoRowCell}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Text style={{ textAlign: 'center', color: '#f8f8ff', fontWeight: 'bold', fontSize: source.rows[i].title.length > 12 ? 17 - (source.rows[i].title.length - 12) : 17 }}>{source.rows[i].title.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
                {plusEl}
            </View>
        );
        infoEls.push(el);
        i++;
    }

    // MODAL MODE
    let modalContent;
    if (modalMode === 'ADD_MODE') {
        modalContent = [
            <View key={'addModal_inputsBlock'} style={{ height: '50%' }}>
                <TextInput
                    style={styles.modalInput}
                    placeholder={'Заголовок'}
                    onChangeText={value => setTitleValue(value)}
                    value={titleValue}
                />
                <TextInput
                    style={styles.modalInput}
                    placeholder={'Ответ'}
                    onChangeText={value => setAnswerValue(value)}
                    value={answerValue}
                />
            </View>,
            <View key={'addModal_addButton'} style={{ height: '40%', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => addNewQuestionHandle()} activeOpacity={0.5} style={styles.modalAddButtonBlock}>
                    <View><Text style={styles.addText}>добавить</Text></View>
                </TouchableOpacity>
            </View>
        ];
    } else if (modalMode === 'INFO_MODE') {
        modalContent = [
            <View key={'infoModal_inputsBlock'} style={{ height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: UserSettings.theme }}>{`${selectedCell!.title.toUpperCase()}`}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#9e9ea3' }}>{selectedCell!.value}</Text>
            </View>,
            <View key={'infoModal_addButton'} style={{ height: '70%', justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => removePinAction()} activeOpacity={0.5} style={styles.modalAddButtonBlock}>
                    <View><Text style={styles.addText}>удалить</Text></View>
                </TouchableOpacity>
            </View>
        ];
    }

    return (
        <View style={styles.profileViewBlock}>
            <View style={styles.loginTitleBlock}>
                <View style={styles.loginWithBackButtonBlock}>
                    <TouchableOpacity activeOpacity={0.5} onPress={(e) => { Emit.emit('routerSetPage', BackButtonPrevPage); }} style={styles.backButton}>
                        <Text style={styles.backButtonTitle}>{'<'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => setIsDropDownMenu(!isDropDownMenu)} style={styles.logoWithBackTextBlock}>
                    <Text style={{ ...styles.appTitle, ...{ color: UserSettings.theme } }}>Lover</Text>
                    <Text style={{ ...styles.appTitle, ...{ color: '#9e9ea3' } }}>Note</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.profileContentBlock}>
                <TouchableOpacity activeOpacity={0.5} style={styles.profileNameBlock}>
                    <Text style={styles.profileNameText}>{source.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => alert('hell')}>
                    <View style={styles.photoBlock}>
                        <Image
                            style={{ width: '100%', height: '100%', borderRadius: 10, opacity: 0.8 }}
                            source={require('../assets/profilePhoto.jpg')}// TODO: save image to data.json
                        />
                    </View>
                </TouchableOpacity>
                {infoEls}
            </ScrollView>
            <TouchableOpacity activeOpacity={0.5} onPress={() => { setTitleValue(''); setAnswerValue(''); setModalMode('ADD_MODE'); setModalVisible(true) }} style={styles.addButtonBlock}>
                <View style={styles.addButtonTitlesBlock}>
                    <View><Text style={styles.addText}>добавить</Text></View>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}

            >
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        height: modalMode === 'ADD_MODE' ? 500 : 250,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderWidth: 4,
                        borderColor: UserSettings.theme,
                        borderBottomColor: 'white',
                        backgroundColor: 'white'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(!modalVisible);
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
                            {modalContent}
                        </View>
                    </View>
                </View>
            </Modal>
            {isDropDownMenu && <DropDownMenu />}
        </View >
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
        // justifyContent: 'space-around',
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
        // fontWeight: 'bold'
    },
    infoRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        marginTop: '5%',
        // marginBottom: 10,
        // backgroundColor: 'red'
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
        flex: 1,
        // padding: '5%',
        // alignItems: 'center'
        // backgroundColor: 'purple'
    },
    appTitle: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    addButtonBlock: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#90ee90',
        marginTop: 15,
        backgroundColor: UserSettings.theme,
        borderRadius: 10
    },
    addButtonTitlesBlock: {
        // width: '35%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
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
        // backgroundColor: 'red',
    },
    profileNameText: {
        textAlign: 'center',
        // height: '29%',
        fontSize: 25,
        color: '#9e9ea3',
        fontWeight: 'bold',
        // backgroundColor: 'purple'
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
        // backgroundColor: 'red',
    }
});

export default ProfileView;