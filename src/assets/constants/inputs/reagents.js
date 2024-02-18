const reagents = {
        reagentName: {
            label: 'Вещество',
            id: 'outlined-required',
            initValue: "",
            required: true,
            validateRules: ["spaceBetweenWordsOnly", {"minLength": 2}, {"maxLength": 30}]
        },
        reagentAmount: {
            label: 'Количество',
            id: 'outlined-required',
            initValue: "",
            required: true,
            validateRules: ["spaceBetweenWordsOnly", {"minLength": 3}, {"maxLength": 30}]
    },
};

export default reagents;