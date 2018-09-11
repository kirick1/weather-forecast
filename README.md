[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
# [Готовое задание на хостинге](https://weather-forecast-test-task.herokuapp.com)
# Тестовое задание
### Задача:
Написать сервер на nodejs, который:
- опрашивает раз в 2 секунды погоду  двух городов: Киев (важный) и Лондон (не важный)
- мы готовы ждать ответа важного источника не более 3 секунд, иначе вместо блока показать сообщение "не дождались погоды"
- мы готовы ждать не важный источник не дольше важного источника, иначе вместо блока показать сообщение "дождя"
- можно использовать любой шаблонизатор
- ошибки (если источники не успели ответить) нужно складывать в лог-файл
- в браузере на фронте вывести через websocket раз в 1с и строить динамически графики
- точная верстка не обязательна
- сервер должен запускаться командой npm i && npm run start и работать на http://localhost:3000
### Адреса источников данных:
[openweathermap.org](https://www.openweathermap.org/current)
