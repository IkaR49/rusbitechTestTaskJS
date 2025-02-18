﻿# Что это?

В этом репозитории расположено моё тестовое задание, которое я делал при первой попытке трудоустройства в свою первую it-компанию, а именно АО "НПО РусБИТех". Тогда я ответа не получил, и позже пришёл к ним как С++ программист. Было это в 2018 году.

Дальнейшая информация в этом README - как было на момент выполнения задания.

## Обо мне

Зовут меня Левченко Павел ( __ya.ikar49@ya.ru__ ), был у вас на собеседовании в минувшую среду (12 число).

## Насчёт задания

Файл с исходным заданием приложен.

Но я позволил себе внести некоторые изменения в изначальную постановку задачи.

Согласно исходному заданию класс "Занятие" должен содержать в себе идентификатор преподавателя. Однако, я его вынес в класс "Предмет обучения" исходя из следующих собразжений:

* Не наносит ущерба оцениванию работы
* Слегка упрощается структура html (меньше проверок и действий)
* Банальная логика: преподаватель ведёт дисциплину полностью и не меняется каждое занятие
* Исходя из предыдущего пункта семантически класс "Предмет обучения" становится более полным

## Насчёт исходных данных и кода

Исходные данные хранятся в директории _/json_ в соответствующем формате. Собраны они генератором, который можно увидеть в старых ревизиях в _stubs.js_.

Кроме того, в ветке _default_ содержится только frontend. Я дополнительно использовал __Node.js__ с простейшим сервером из модуля __node_static__. И, конечно же, вышеупомянутый генератор (который, к слову, ужасен).

Сервер и генератор тоже выложены, но в ветку _full_, не являющуюся основной.

### Почему не Git?

Процитирую Моленара Брама (страница загрузки на сайте www.vim.org):

> This page will help you decide what to download.
>
> [ . . . ]
>
> GitHub		Obtain Vim sources with a git client (recommended).
>
> Mercurial		Obtain Vim sources with a Mercurial client (recommended __if you don't like git__)
>
> [ . . . ]

Иными словами, мне просто нравится hg.