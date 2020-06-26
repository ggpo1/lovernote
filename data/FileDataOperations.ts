import * as FileSystem from 'expo-file-system';
import Profile from './../models/Profile';

export default class FileDataOperations {
    public static ClearData() {
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', '');
    }

    public static SaveData(data: Array<Profile>) {
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data.json', JSON.stringify(data));
    }
}