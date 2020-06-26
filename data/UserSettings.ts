import IUserSettings, { GenderType, ThemeType } from '../models/IUserSettings';

let UserSettings: IUserSettings = {
    gender: GenderType.NOT_INIT,
    theme: ThemeType.PINK
}

export default UserSettings;