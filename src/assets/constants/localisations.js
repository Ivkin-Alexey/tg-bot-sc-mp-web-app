const localisations = {
    pages: {
        reagents: {
            units: ['г', 'кг', 'мл', 'л'],
            tgMainButtonText: 'Отправить заявку',
            maxNumberOfReagents: 5
        },
        editPersonalData: {
            tgMainButtonText: 'Отправить данные',
            confirmMessage: "Ваша заявка отправлена директору научного центра. " +
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
            applicationDeleteAlert: "Вы действительно хотите удалить эту заявку?"
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
    components: {},
};
export default localisations;


