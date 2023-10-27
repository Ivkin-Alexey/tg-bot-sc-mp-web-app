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
                "Вы можете редактировать данные с помощью кнопки \"Меню\"."
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
            subHeader: "Обучающиеся"
        },
        adminList: {
            subHeader: "Администраторы"
        },
        listPage: {
            emptyUserListAlert: "Пользователи ещё не зарегестрированы"
        }
    },
    components: {
        form: {
            positionList: [
                {
                    value: 'student',
                    label: 'Студент',
                },
                {
                    value: 'postGraduate',
                    label: 'Аспирант',
                },
            ],
            studentsEducationYearList: [
                {
                    value: 'firstYearMaster',
                    label: '1 курс магистратуры',
                },
                {
                    value: 'secondYearMaster',
                    label: '2 курс магистратуры',
                },
                {
                    value: 'firstYear',
                    label: '1 курс',
                },
                {
                    value: 'secondYear',
                    label: '2 курс',
                },
                {
                    value: 'thirdYear',
                    label: '3 курс',
                },
                {
                    value: 'fourthYear',
                    label: '4 курс',
                },
                {
                    value: 'fifthYear',
                    label: '5 курс',
                },
                {
                    value: 'sixthYear',
                    label: '6 курс',
                },
            ],
            postGraduatesEducationYearList: [
                {
                    value: 'firstYearPostGraduate',
                    label: '1 курс',
                },
                {
                    value: 'secondYearPostGraduate',
                    label: '2 курс',
                },
                {
                    value: 'thirdYearPostGraduate',
                    label: '3 курс',
                },
                {
                    value: 'fourthYearPostGraduate',
                    label: '4 курс',
                },
            ],
            researches: researches
        },
    }
};
export default localisations;


