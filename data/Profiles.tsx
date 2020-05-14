import Profile from "../models/Profile";

let Profiles: Array<Profile> = [
    {
        id: 1,
        photo: require('../assets/profilePhoto.jpg'),
        name: 'Оля Новакова',
        birth: '03.09.1999',
        rows: [
            {
                key: 'bornPlace',
                type: 'string',
                title: 'город рождения',
                value: 'Белгород'
            },
            {
                key: 'liveCity',
                type: 'string',
                title: 'город проживания',
                value: 'Москва'
            },
            {
                key: 'favoriteDog',
                type: 'string',
                title: 'Любимая собака',
                value: 'Овчарка'
            },
            {
                key: 'song',
                type: 'string',
                title: 'Песня',
                value: 'Queen - I Want To Break Free'
            },
            {
                key: 'vkLink',
                type: 'link',
                title: 'ВК',
                value: 'https://vk.com/id45031831'
            },
            {
                key: 'telegramLink',
                type: 'link',
                title: 'телега',
                value: 'https://t.me/ONovakova'
            },
            {
                key: 'phone',
                type: 'phone',
                title: 'телефон',
                value: '+7 926 001 17 89'
            }
        ]
    },
];

export default Profiles;