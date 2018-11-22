import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    ru: {
        $vuetify: {
            login: 'Логин',
            password: 'Пароль',
            loginAction: 'Войти',
            logout: 'Выйти',
            yes: 'Да',
            no: 'Нет',
            noDataText: 'Отсутствуют данные',
            createBannerTitle: 'Создание новой акции',
            createBlockTitle: 'Создание нового блока',
            updateBannerTitle: 'Редактирование акции',
            updateBlockTitle: 'Редактирование блока',
            deleteBannerTitle: 'Удаление акции',
            deleteBlockTitle: 'Удаление блока',
            uploadFileTitle: 'Загрузить файл акций',
            beforeDeletion: 'Вы уверены, что хотите удалить данную акцию?',
            delete: 'Удалить',
            edit: 'Редактировать',
            banners: 'Акции',
            blocks: 'Блоки',
            title: 'Название',
            body: 'Контент',
            region: 'Регион',
            store: 'Аптека',
            products: 'Товары',
            active: 'Активный',
            create: 'Создать',
            update: 'Обновить',
            upload: 'Загрузить',
            uploadFile: 'Загрузить файл',
            uploadCSVFile: 'Загрузить файл акций (CSV)',
            importVirtualCardsCSV: 'Импорт виртуальных карт (CSV)',
            createBanner: 'Создать акцию',
            createBlock: 'Создать блок',
            fileSuccess: 'Файл акций был успешно загружен',
            close: 'Закрыть',
            public: 'Открытый доступ',
            selectProducts: 'Выбрать товары',
            startDate: 'Начало действия',
            endDate: 'Окончание действия',
            noData: 'Данные отсутствуют'
        }
    }
}

const i18n = new VueI18n({
    locale: 'ru',
    messages
})

export default i18n
