# "ToDo"

Классическая ToDo-шка на React

## О приложениии

Демо [ToDo](https://todospa-b7372.web.app)

* SPA приложение собрано на ReactJS + Redux/Toolkit
* Добавление, удаление и перемещение в выполненные синхронизировано с сервером
* Файл настроек `src/env.json` : initialState для todo-листа, backend url и лимит на количество первоначально загружаемых todo, цвета стилизации, тексты для header.
* Прелоадер и обработка ошибок сервера с оповещением пользователя

## Стек технологий

* ReactJS, Redux/Toolkit, Hooks, Styled Components, Context Provider.
* Настройки приложения в `env.json`.
* Для демо-версии todo получаем с fake API `https://jsonplaceholder.typicode.com`.
* Если сервер не генерирует id для todo автоматически, предусмотрена генерация уникальных id c помощью keyGen (`src/components/functions/keyGen.js`) либо timestamp создания todo. Для использования см комментарии в файле `src/components/store/todoSlice.js`.
* Сборка с помощью [Create React App](https://github.com/facebook/create-react-app).
* Деплой демо готовой сборки на [Firebase Hosting](https://firebase.google.com).

## Как установить?

* Скопировать содержимое репозитория в рабочую папку
* В терминале выполнить команду `npm install`
* В случае создания проекта с помощью Create React App дополнительно установить пакеты из `add_packages.txt`.
* Проверить соответствие версий установленной `NodeJS` и пакета `node-sass` в [документации](https://www.npmjs.com/package/node-sass).
* Запустить development mode командой `npm start`.
* Открыть `http://localhost:3000` для просмотра в браузере.
* Для сборки приложения команда `npm run build`. Готовый проект будет в папке `build` рабочей директории.