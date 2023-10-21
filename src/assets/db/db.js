import {getUsers} from "../../methods/requestsToServer";

export const equipment = [
    {
        category: {ru: 'Избранное', en: 'favourites'},
        list: ['Nabertherm', 'Микроскоп 1'],
        imgSrc: 'https://docs.google.com/spreadsheets/d/1DzK7-8XCBOmPmmtTpVOR_kEYh1oVfyQD4sUODwKmQK0/edit#gid=0&range=G226'
    },
    {
        category: {ru: 'Без категории', en: 'without_category'},
        list: ['Тест падающего груза']
    },
    {
        category: {ru: 'Печи', en: 'furnaces'},
        list: ['Лоип 1', 'Лоип 2', 'Nabertherm', 'ПТК']
    },
    {
        category: {ru: 'Микроскопы', en: 'microscopes'},
        list: ['Микроскоп сканирующий электронный Vega 3 LMH', 'Микроскоп 2', 'Микроскоп 3', 'Микроскоп 4', 'Микроскоп 5', 'Микроскоп 6', 'Микроскоп 7']
    },
    {
        category: {ru: 'Ситовые анализаторы', en: 'sieve_analyzers'},
        list: ['1', '2', '3', '4']
    }
];

export const applications = [
    {
        name: 'Термический анализ',
        urlName: 'thermalAnalysis',
    },
    {
        name: 'Высокотемпературные процессы',
        urlName: 'furnaces',
    },
];

export const statistic = [
    {user: "Габдулхаков Р.Р.", equipment: "УЗК-1"},
    {user: "Зубкова О.С.", equipment: "Лоип 1"},
    {user: "Спецов Е.А.", equipment: "Quantochrom"},
    {user: "Кудинова А.А.", equipment: "Tescan Vega 3.0"}
]



