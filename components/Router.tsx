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

function Router() {
    const [page, setPage] = useState<number>(0);
    const [profileId, setProfileId] = useState<number>(0);
    const [profiles, setProfiles] = useState<Array<Profile>>([]);

    console.log('THEME: ' + UserSettings.theme);

    console.log('____________ROUTER RENDER____________');
    // FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', '');

    if (Emit.listeners('routerSetPage').length === 0) 
        Emit.addListener('routerSetPage', (newPage: number, newProfileId?: number) => {
            if (newProfileId !== undefined) 
                setProfileId(newProfileId);
            setPage(newPage);
        });

    // let _profiles: Array<Profile> = [];
    if (LoadCounter.count < 1) {
        (async () => {
            let data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data.json');
            // console.log(data);
            // source.push(JSON.parse(data));
            if (JSON.stringify(profiles) !== data) {
                setProfiles(JSON.parse(data));
                Emit.emit('loginViewSetSource', JSON.parse(data));
            }
        })();
    }
    // FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', JSON.stringify(Profiles));
    
    let pageElement!: JSX.Element;
    if (page === 0) {
        pageElement = <LoginView source={profiles} />;
    } else if (page === 1) {
        pageElement = <ProfileView fullSource={profiles} profileId={profileId} />
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