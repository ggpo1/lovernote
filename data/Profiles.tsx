import Profile from "../models/Profile";

let Profiles: Array<Profile> = [
    {
        id: 1,
        photo: require('../assets/profilePhoto.jpg'),
        name: 'Маша Соколова',
        birth: '03.09.1999',
        rows: [
            {
                key: 'bornPlace',
                type: 'string',
                title: 'город рождения',
                value: 'Москва'
            },
            {
                key: 'university',
                type: 'string',
                title: 'Уник',
                value: 'Плехановка'
            },
            {
                key: 'spec',
                type: 'string',
                title: 'Специальность',
                value: 'Экономист'
            },
            {
                key: 'vkLink',
                type: 'link',
                title: 'ВК',
                value: 'https://vk.com/msokolovav'
            },
            {
                key: 'phone',
                type: 'phone',
                title: 'телефон',
                value: '+7 916 987 25 53'
            }
        ]
    },
];

export default Profiles;