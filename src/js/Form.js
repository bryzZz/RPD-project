export default class Form{
    constructor({id, formClass, legend, fieldsArr, data, objectToSaveData, compliteFunction, againFunction, buttons}){
        this._id = id;
        this._formClass = formClass;
        this._legend = legend;
        this._fieldsArr = fieldsArr;
        this._data = data;
        this._objectToSaveData = objectToSaveData;
        this._compliteFunction = compliteFunction;
        this._againFunction = againFunction;
        this._buttons = buttons;
    }

    getForm(){
        const form = document.createElement('form'); // создание новой пустой формы
        form.classList.add(this._formClass); // добавление этой форме класса

        if(this._id === 0){
            document.querySelector('.title').textContent = 'РПД IV пункт';
            document.querySelector('.title').classList.add('center');
            form.classList.add('center');
        }

        let formInner = document.createElement('div'); // тут будет внутренняя вёрска для формы
        formInner.classList.add(this._formClass + '__inner');

        for(let i = 0; i < this._fieldsArr.length; i++){ // цикл переберёт все переданные элементы
            // вытаскиваем переменные из элемента
            let name = this._fieldsArr[i]?.name,
                text = this._fieldsArr[i]?.text,
                inputType = this._fieldsArr[i]?.inputType,
                inputValue = this._fieldsArr[i]?.inputValue,
                datalist = this._fieldsArr[i]?.datalist,
                placeholder = this._fieldsArr[i]?.placeholder,
                required = this._fieldsArr[i]?.required;


            const formItem = document.createElement('div');
            formItem.classList.add(this._formClass + '__field', name);

            const p = document.createElement('p');
            p.classList.add(this._formClass + '__field-text', name + '__text');
            p.textContent = `${text}:`;
            formItem.append(p);

            const input = document.createElement('input');
            input.classList.add(this._formClass + '__field-input', name + '__input');
            input.setAttribute('type', inputType);
            input.setAttribute('name', name);
            input.setAttribute('tabindex', i+1);
            input.setAttribute('placeholder', placeholder);
            input.required = (required ? true : false);
            input.setAttribute('value', this._data[name] ? this._data[name] : inputValue);
            formItem.append(input);

            // если для элемента есть варианты выбора то вставялем и их в вёрстку
            if(datalist){
                input.setAttribute('list', name);

                const list = document.createElement('datalist');
                list.setAttribute('id', name);

                datalist.forEach(item => {list.innerHTML += `<option value="${item}">`;});

                formItem.append(list);
            }

            formInner.append(formItem); // добавляем вёрску элемента во внутрь формы
        }

        // вёрска внутри всей формы
        form.innerHTML = `<div class="form__fields">
            <legend>Форма №${this._id + 1} - ${this._legend}</legend>
            ${formInner.innerHTML}
            ${this._id === 0 ? ` <div class="${this._formClass + '__field'}"> <input id="image-file" type="file" /> </div>` : ''}
            </div>`;

        const formNavigation = document.createElement('div');
        formNavigation.classList.add(this._formClass + '__navigation');

        const compliteBtn = document.createElement('button');
        compliteBtn.classList.add(this._formClass + '__navigation-next');
        compliteBtn.textContent = this._buttons[0];
        compliteBtn.addEventListener('click', (e) => this._compliteFunction(e, Object.fromEntries(new FormData(form))).bind(this));

        if(this._buttons.length === 2){
            const againBtn = document.createElement('button');
            againBtn.classList.add(this._formClass + '__navigation-again');
            againBtn.textContent = this._buttons[1];
            againBtn.addEventListener('click', (e) => this._againFunction(e, Object.fromEntries(new FormData(form))).bind(this));
            formNavigation.append(againBtn);
        }

        formNavigation.append(compliteBtn);
        form.append(formNavigation);

        // form.addEventListener('submit', (e) => this._submitFunction(e).bind(this));

        return form;
    }
}