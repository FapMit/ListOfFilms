<br clear="both">

###

<h1 align="center">Список фильмов - MovieApp</h1>

###

<h3 align="left">💬 О приложении</h3>

###

<p align="justify ">Приложение «MovieApp» — это удобный инструмент для любителей кино, который помогает управлять списком любимых фильмов. С его помощью вы можете добавлять новые фильмы в свой список, изменять названия фильмов, удалять фильмы, отмечать просмотренные фильмы и просматривать статистику по просмотренным фильмам.<p>

###

<h3 align="left">🛠 Технологии:</h3>

###

<div align="left">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/>
  <img src="https://logodix.com/logo/1637364.png" alt="firebase" width="100" height="40"/>
</div>

###

<h3 align="left">💻 Превью:</h3>

###

<div align="center">
  <img src="https://i.ibb.co/pW7mFy1/fapmit-github-io-List-Of-Films-preview.jpg" alt="preview" width="650px" height="560px"/>
</div>

###

<h3 align="left">🧾 Структура проекта:</h3>

###

```bash
  src/
      resources/
          fonts                -- папка со шрифтами проекта
          scripts/             -- папка со скриптами проекта
              animation.js     -- файл для добавления анимаций
              constants.js     -- файл с константами проекта
              index.js         -- основной файл проекта
              model.js         -- файл, описывающий модель проекта
              storage.js       -- файл, описывающий хранилище проекта
              view.js          -- файл, описывающий визуальную часть проекта
      styles/
          fonst.css            -- файл для подключения шрифтов
          reset.css            -- файл для сброса стандартных стилей
          style.css            -- файл со всеми стилями проекта

  index.html                   -- главный файл html
```

###

<h3 align="left">⚙️ Инструкция по запуску проекта:</h3>

###

Для начала работы скачайте проект себе на компьютер любым удобным способом:

1. Либо с использованием команды git clone

```bash
  git clone https://github.com/FapMit/ListOfFilms.git
```

2. Либо с помощью скачивания архива, в выпадающем меню <b><> Code</b>

Затем необходимо открыть проект в любом удобном для вас редакторе кода и в терминале установить все зависимости с помощью следубщей инструкции

```bash
  npm install
```

После чего следует зарегистрироваться в сервисе <a href="https://console.firebase.google.com/u/0/" target="_blank" >FIREBASE</a> и затем создать свою базу данных.

1. Создаем проект с помощью кнопки <b>Create a project</b> на главной странице
2. Вводим подходящее название для проекта и нажимаем <b>Continue</b>
3. Выключаем Google Analytics и нажимаем <b>Create project</b>
4. Создаем web приложение с помощью соответствующей кнопки <b></></b> на главной странице проекта
5. Задаем имя приложения и регестрируем его

Сформированный конфиг firebase копируем и вставляем его в файл <b>resources/scripts/storage.js</b> в соответсвующее место

Переходим по кнопке <b>Cloud Firestore</b> и создаем БД с помощью кнопки <b>Create Database</b>, выбирая при этом тестовый режим.

Затем необходимо создать коллекцию с <b>ID</b> - movies, либо с другим, но тогда следует поменять в файле <b>resources/scripts/constants.js</b> константу <b>MOVIELIST_STORAGE_KEY</b>. В содержимое БД ввести любые данные, а после создания коллекции удалить ее содержимое.

Ну вот и всё. Теперь можно запустить проект с помощью команды

```bash
  npm run start
```
