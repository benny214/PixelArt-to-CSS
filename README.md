
Pixel Art to CSS generator
--------------------------

Проект для loftschool

**TODO**
* Добавить сетку
* Добавить кнопку отправки на почту результата
* Реализовать возможность полного сброса
* Сделать выборку цветов
* Стилизовать !!!

## Получение домена .tk бесплатно и привязка его к репозиторию GitHub  ##

* Идём на [freenom.com](http://freenom.com/) и регистрируемся там и регистрируем домен, после переходим в manage domain =>
![](http://i.imgur.com/98bYO32.png) 

* Затем переходим в Manage Freenom DNS =>

![](http://i.imgur.com/bii0lHo.png)

* Добавляем одно поле и прописываем следующие IP  и свой домен в таком виде (вместо pixelart-css.tk ваш домен) =>

![](http://i.imgur.com/8Rycaui.png)


*  `git checkout -b gh-pages`

устанавливаем эту ветку по умолчанию

![](http://i.imgur.com/Hve5dSr.png)

* Затем в своем репозитории создаем файл `CNAME` (обязательно в верхнем регистре !!!)

 `touch CNAME`
    
* В этом файле прописываем своё доменное имя в таком виде

![](http://i.imgur.com/24vbNee.png)

* Добавляем `CNAME` в репозиторий на сервер
*  `git add CNAME` 
* `git commit -am "Добавлен CNAME"` 
* `git push origin master`
* На github переходим в `settings` и убеждаемся, что ваша страничка отображается по вашему адресу 

![](http://i.imgur.com/xRReZwz.png)

через 10-20 минут всё должно работать.
