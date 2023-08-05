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
        fields: ['Название образца', 'Скорость нагрева', 'Газовая среда', 'Начальная температура анализа', 'Конечная температура анализа']
    },
    {
        name: 'Высокотемпературные процессы',
        fields: ['Название образца', 'Температура', 'Время нагрева']
    },
    {
        name: 'Электронная микроскопия',
        fields: []
    },
    {
        name: 'ИК-спектроскопия',
        fields: []
    },
    {
        name: 'Изготовление аншлифов',
        fields: []
    }
]

export const formsFields = {
    editPersonalData: [
        {name: '', label: '', type: 'outlined-required', validateRule: ''},
        {name: '', label: '', type: 'outlined-required', validateRule: ''},
        {name: '', label: '', type: 'outlined-required', validateRule: ''},
        {name: '', label: 'Должность', type: 'outlined-search', validateRule: ''},
        {name: '', label: 'Мобильный', type: 'outlined-helperText', validateRule: ''},
    ],
};
