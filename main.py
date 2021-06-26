import eel, random

eel.init('web') #инициализация папки в которой лежит приложение

# @eel.expose
# def getForm(componentsList):
#     form = ''

#     for i in range(len(componentsList)):
#         formItem = '<div class="form__field {name}"></div><p class="{name}__text">{text}:</p><input type="{inputType}" name="{name}" tabindex="{i}" value="{inputValue}" placeholder="{placeholder}" required="{required}">'.format(
#                 name = componentsList[i]['name'],
#                 text = componentsList[i]['text'],
#                 inputType = componentsList[i]['inputType'],
#                 i = i,
#                 inputValue = componentsList[i]['inputValue'],
#                 placeholder = componentsList[i]['placeholder'],
#                 required = componentsList[i]['required']
#             )
#         form += formItem
    
#     return form

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