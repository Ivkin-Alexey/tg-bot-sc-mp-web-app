import researches from "../constants";

const localisations = {
    pages: {
        reagentApplication: {
            units: ['г', 'кг', 'мл', 'л'],
            tgMainButtonText: 'Отправить заявку',
            confirmMessage: "Ваша заявка отправлена. Ожидайте её подтверждения",
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
            roleTitle: {user: "Пользователь", admin: "Администратор", superAdmin: "Супер администратор",}
        },
        personProfile: {
            applicationDeleteMessage: "Вы действительно хотите удалить эту заявку?",
            applicationConfirmAlert: "У пользователя не заполнены обязательные поля"
        },
        personList: {
            subHeader: "Обучающиеся:",
            listIsEmpty: "Пользователи ещё не зарегестрированы"
        },
        employeesList: {
            subHeader: "Сотрудники:",
            listIsEmpty: "Пользователи ещё не зарегестрированы"
        },
        newPersonList: {
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
            categoryList: ["Студент", "Аспирант", "Сотрудник"],
            studentsEducationYearList: ["1 курс магистратуры", "2 курс магистратуры", "1 курс", "2 курс", "3 курс", "4 курс", "5 курс", "6 курс"],
            postGraduatesEducationYearList: ["1 курс", "2 курс", "3 курс", "4 курс"],
            header: "Заполните поля:",
        },
        equipmentList: {
            listIsEmpty: "Список пуст"
        },
        profile: {
            emptyFullName: "ФИО не указано",
        },
        nestedList: {
            emptyFullName: "ФИО не указано",
        }
    }
};
export default localisations;


