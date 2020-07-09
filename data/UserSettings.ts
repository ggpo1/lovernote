import IUserSettings, { GenderType, ThemeType } from '../models/IUserSettings';

let UserSettings: IUserSettings = {
    gender: GenderType.NOT_INIT,
    theme: ThemeType.NOT_INIT
}

export default UserSettings;