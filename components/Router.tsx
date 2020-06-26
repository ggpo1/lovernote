import React, { useState } from 'react';
import { StyleSheet, Text, View, EventEmitter } from 'react-native';

import LoginView from '../views/LoginView';
import Profiles from '../data/Profiles';
import Profile from '../models/Profile';
import Emit from '../data/Emit';
import ProfileView from '../views/ProfileView';
import * as FileSystem from 'expo-file-system';
import { LoadCounter } from '../data/LoadCounter';
import UserSettings from '../data/UserSettings';
import { GenderType } from '../models/IUserSettings';
import Page from '../models/Page';
import GiftsView from '../views/GiftsView';
import FileDataOperations from './../data/FileDataOperations';

function Router() {
    const [page, setPage] = useState<Page>(Page.LOGIN);
    const [profileId, setProfileId] = useState<number>(0);
    const [profiles, setProfiles] = useState<Array<Profile>>([]);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    // console.log('THEME: ' + UserSettings.theme);

    // console.log('____________ROUTER RENDER____________');
    // FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', '');
    // FileDataOperations.ClearData();

    if (Emit.listeners('routerSetPage').length === 0)
        Emit.addListener('routerSetPage', (newPage: number, newProfileId?: number) => {
            if (newProfileId !== undefined)
                setProfileId(newProfileId);
            setPage(newPage);
        });

    if (Emit.listeners('forceUpdateEmit').length === 0)
        Emit.addListener('forceUpdateEmit', () => {
            forceUpdate
        });

    let IsJsonString = (str: string) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // let _profiles: Array<Profile> = [];
    if (LoadCounter.count < 1) {
        (async () => {
            let data: any = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data.json');

            if (JSON.stringify(profiles) !== data) {
                let parsed = [];
                //parsed = JSON.parse(data);

                if (IsJsonString(data)) {
                    // parsed = JSON.parse(data);
                    setProfiles(JSON.parse(data));
                    Emit.emit('loginViewSetSource', JSON.parse(data));
                }


            }
        })();
    }
    // FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', JSON.stringify(Profiles));
<<<<<<< HEAD
    
    // console.log(profiles);
=======
>>>>>>> 12746a19998a4cbf34b121c0e509dd551f5489e9

    let pageElement!: JSX.Element;
    if (page === Page.LOGIN) {
        pageElement = <LoginView source={profiles} />;
    } else if (page === Page.PROFILE) {
        pageElement = <ProfileView fullSource={profiles} profileId={profileId} />
    } else if (page === Page.GIFTS) {
        pageElement = <GiftsView />
    } else if (page === Page.DATES) {
        pageElement = <View></View>
    } else if (page === Page.QUIZ) {
        pageElement = <View></View>
    }

    return (
        <View style={styles.routerWrapper}>
            {pageElement}
        </View>
    );
}

const styles = StyleSheet.create({
    routerWrapper: {
        flex: 1
    }
});

export default Router;