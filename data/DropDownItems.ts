import Page from "../models/Page";

const DropDownItems = {
    ru: [
        {
            page: Page.GIFTS,
            title: 'Подарки'
        },
        {
            page: Page.DATES,
            title: 'Свидания'
        },
        {
            page: Page.QUIZ,
            title: 'Опрос'
        }
    ],
    en: [
        {
            page: Page.GIFTS,
            title: 'Gifts'
        },
        {
            page: Page.DATES,
            title: 'Dates'
        },
        {
            page: Page.QUIZ,
            title: 'Quiz'
        }
    ]
};

export default DropDownItems;