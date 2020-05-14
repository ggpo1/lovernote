export enum GenderType {
    NOT_INIT = -1,
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum ThemeType {
    NOT_INIT = '#9e9ea3',
    BLUE = '#0f93ff',
    PINK = '#ff8fa2',
    PURPLE = '#4d004d',
    GREEN = '#004d00',
}

export default interface IUserSettings {
    gender: GenderType,
    theme: ThemeType
}