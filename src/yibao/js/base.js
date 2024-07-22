export function getDiv(id) {
    return document.getElementById(id)
}

export function selectTxt(div) {
    return document.getElementById(div).options[document.getElementById(div).options.selectedIndex].text
}

export function addListOption(selectId, listItems) {
    document.getElementById(selectId).innerHTML = ""
    for (let item in listItems) {
        let selectID = document.getElementById(selectId);
        let option = document.createElement("option");
        option.appendChild(document.createTextNode(listItems[item]));
        option.setAttribute("value", listItems[item]);
        selectID.appendChild(option);
    }
}

export function cleanDiv(id) {
    document.getElementById(id).innerHTML = ""
}

export function getValue(id) {
    return document.getElementById(id).value
}

export function colorReverse(oldColor) {
    // 颜色反转
    if ((oldColor) > '#777777') {
        return '#000000'
    } else {
        return '#ffffff'
    }
}

// eslint-disable-next-line no-unused-vars
export function changeTextColor(id) {
    getDiv(id).style.color = colorReverse(getDiv(id).value)
    getDiv(id).style.backgroundColor = getDiv(id).value
}


// eslint-disable-next-line no-unused-vars
export function perToPx(ev) {
    // 百分制转整数
    return Number(ev.toString().replace('%', ''))
}
