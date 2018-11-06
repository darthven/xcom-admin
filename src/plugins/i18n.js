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
            updateBannerTitle: 'Редактирование акции',
            deleteBannerTitle: 'Удаление акции',
            uploadFileTitle: 'Загрузить файл акций',
            beforeDeletion: 'Вы уверены, что хотите удалить данную акцию?',
            deleteBanner: 'Удалить',
            updateBanner: 'Редактировать',
            title: 'Заголовок',
            body: 'Контент',
            create: 'Создать',
            update: 'Обновить',
            uploadFile: 'Загрузить файл',
            uploadCSVFile: 'Загрузить файл акций (CSV)',
            createBanner: 'Создать акцию',
            fileSuccess: 'Файл акций был успешно загружен',
            close: 'Закрыть',
            public: 'Открытый доступ',
            selectProducts: 'Выбрать товары',
            startDate: 'Начало действия',
            endDate: 'Окончание действия',
            noData: 'Акции отсутствуют'
        }
    }
}

const i18n = new VueI18n({
    locale: 'ru',
    messages
})

export default i18n
