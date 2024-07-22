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