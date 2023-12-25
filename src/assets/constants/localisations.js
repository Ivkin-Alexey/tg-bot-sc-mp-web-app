import researches from "./constants";

const localisations = {
    pages: {
        reagents: {
            units: ['г', 'кг', 'мл', 'л'],
            tgMainButtonText: 'Отправить заявку',
            maxNumberOfReagents: 5
        },
        editPersonalData: {
            tgMainButtonText: 'Отправить данные',
            confirmMessage: "Ваша заявка отправлена руководству научного центра. " +
                "Ожидайте её подтверждения и информации о дальнейших действиях. " +
                "Вы можете редактировать данные с помощью кнопки \"Меню\".",
            confirmMessageForSuperAdmins: "Данные пользователя отредактированы"
        },
        application: {
            tgMainButtonText: 'Отправить данные',
        },
        equipmentCategoryList: {
            header: 'Выберите категорию:'
        },
        adminProfile: {
            applicationDeleteAlert: "Вы действительно хотите удалить этого администратора?",
            roleTitle: {user: "Обучающийся", admin: "Администратор", superAdmin: "Супер администратор",}
        },
        userProfile: {
            applicationDeleteMessage: "Вы действительно хотите удалить эту заявку?",
            applicationConfirmAlert: "У пользователя не заполнены обязательные поля"
        },
        userList: {
            subHeader: "Обучающиеся:",
            listIsEmpty: "Пользователи ещё не зарегестрированы"
        },
        newUserList: {
            subHeader: "Новые обучающиеся:",
            listIsEmpty: "Нет новых заявок"
        },
        adminList: {
            subHeader: "Администраторы:",
            listIsEmpty: "Пользователи ещё не зарегестрированы"
        },
        nestedList: {
            subHeader: "Обучающиеся:",
            listIsEmpty: "Пользователи ещё не зарегестрированы"
        }
    },
    components: {
        form: {
            positionList: [
                {
                    value: 'Студент',
                    label: 'Студент',
                },
                {
                    value: 'Аспирант',
                    label: 'Аспирант',
                },
            ],
            studentsEducationYearList: [
                {
                    value: '1 курс магистратуры',
                    label: '1 курс магистратуры',
                },
                {
                    value: '2 курс магистратуры',
                    label: '2 курс магистратуры',
                },
                {
                    value: '1 курс',
                    label: '1 курс',
                },
                {
                    value: '2 курс',
                    label: '2 курс',
                },
                {
                    value: '3 курс',
                    label: '3 курс',
                },
                {
                    value: '4 курс',
                    label: '4 курс',
                },
                {
                    value: '5 курс',
                    label: '5 курс',
                },
                {
                    value: '6 курс',
                    label: '6 курс',
                },
            ],
            postGraduatesEducationYearList: [
                {
                    value: '1 курс',
                    label: '1 курс',
                },
                {
                    value: '2 курс',
                    label: '2 курс',
                },
                {
                    value: '3 курс',
                    label: '3 курс',
                },
                {
                    value: '4 курс',
                    label: '4 курс',
                },
            ],
            researches: researches
        },
    }
};
export default localisations;


