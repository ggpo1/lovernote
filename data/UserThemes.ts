import IUserThemes from "../models/IUserTemes";
import { ThemeType } from "../models/IUserSettings";

const UserThemes: Array<IUserThemes> = [
    {
        key: ThemeType.PINK,
        title: 'Розовый',
        color: ThemeType.PINK
    },
    {
        key: ThemeType.BLUE,
        title: 'Голубой',
        color: ThemeType.BLUE
    },
    {
        key: ThemeType.GREEN,
        title: 'Зеленый',
        color: ThemeType.GREEN
    },
    {
        key: ThemeType.PURPLE,
        title: 'Пурпурный',
        color: ThemeType.PURPLE
    },
];

export default UserThemes;