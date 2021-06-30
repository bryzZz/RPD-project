function createElement({tagName, className, textContent, attributes, styles}){
    const element = document.createElement(tagName);
    if(textContent) {
        element.textContent = textContent;
    }
    if(className){
        if(Array.isArray(className)){
            element.classList.add(...className);
        }else{
            element.classList.add(className);
        }
    }
    if(attributes){
        for(const [key, value] of Object.entries(attributes)){
            element.setAttribute(key, value);
        }
    }
    if(styles){
        Object.assign(element.style, styles);
    }
    return element;
}

export {createElement};