import {createElement} from './utils.js';

export default class Form{
    constructor({id, formClass, legend, fieldsArr, data, objectToSaveData, compliteFunction, againFunction, buttons}){
        this._id = id;
        this._formClass = formClass;
        this._legend = legend;
        this._fieldsArr = fieldsArr;
        this._data = data;
        this._objectToSaveData = objectToSaveData;
        this._buttons = buttons;

        this._isIncorrect = false;
    }

    getForm(){
        const form = createElement({tagName: 'form', className: this._formClass});

        const formFields = createElement({tagName: 'div', className: this._formClass + '__fields'});
        const formNavigation = createElement({tagName: 'div', className: this._formClass + '__navigation'});

        //надпись над формой
        const legend = createElement({tagName: 'legend', textContent: `Форма №${this._id + 1} - ${this._legend}`});
        formFields.append(legend);
        
        //поля формы
        for(let i = 0; i < this._fieldsArr.length; i++){ // цикл переберёт все переданные элементы
            // вытаскиваем переменные из элемента
            let {name, text, inputType, inputValue, datalist, placeholder, correctRegExp} = this._fieldsArr[i];

            const formItem = createElement({tagName: 'div', className: [this._formClass + '__field', name]});

            const p = createElement({
                tagName: 'p', 
                className: this._formClass + '__field-text', 
                textContent: text + ':'
            });
            const input = createElement({
                tagName: 'input', 
                className: this._formClass + '__field-input',
                attributes: {
                    type: inputType,
                    name: name,
                    tabindex: i+1,
                    placeholder: placeholder,
                    value: this._data[name] ? this._data[name] : inputValue
                }
            });

            input.addEventListener('input', (e) => {
                if(!correctRegExp.test(e.target.value)){
                    e.target.classList.add(this._formClass + '__field-input--incorrect');
                    this._isIncorrect = true;
                }else{
                    e.target.classList.remove(this._formClass + '__field-input--incorrect');
                    this._isIncorrect = false;
                }
            });

            formItem.append(p, input);

            // если для элемента есть варианты выбора то вставялем и их в вёрстку
            if(datalist){
                const list = createElement({tagName: 'datalist', attributes: {id: name}});

                input.setAttribute('list', name);

                datalist.forEach(item => {list.innerHTML += `<option value="${item}">`;});

                formItem.append(list);
            }

            formFields.append(formItem); // добавляем вёрску элемента во внутрь формы
        }

        // добавить инпут файла если форма первая
        if(this._id === 0){
            const formField = createElement({tagName: 'div', className: this._formClass + '__field'});
            formField.append(createElement({tagName: 'input', attributes: {type: 'file'}}));

            formFields.append(formField);
        }

        // добавление кнопочек
        for(const [name, func] of this._buttons){
            const btn = createElement({tagName: 'button', textContent: name});
            btn.addEventListener('click', (e) => func(e, Object.fromEntries(new FormData(form)), this));
            formNavigation.append(btn);
        }

        form.append(formFields, formNavigation);

        return form;
    }
}