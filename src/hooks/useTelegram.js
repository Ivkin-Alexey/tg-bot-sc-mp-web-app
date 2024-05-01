const tg = window.Telegram.WebApp;

export function useTelegram() {

    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        person: tg.initDataUnsafe?.person,
        accountChatID: tg.initDataUnsafe?.person?.id,
        queryId: tg.initDataUnsafe?.query_id,
        themeParams: tg.themeParams,
    }
}
