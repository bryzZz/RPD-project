import eel, random

eel.init('web') #инициализация папки в которой лежит приложение

#
# def print_(n):
#     print('Got this from Javascript:', n)
# eel.js_random()(print_)

# eel.js_random()(lambda n: print('Got this from Javascript:', n))

# @eel.expose
# def randInt():
#     return random.random()

#так можно объявлять функцию которую можно будет использовать в js
@eel.expose
def myPrint(str):
    print('python print:', str)

eel.start('index.html', size=(700, 500)) # запуск приложения