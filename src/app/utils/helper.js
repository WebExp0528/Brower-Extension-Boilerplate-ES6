/**
 * Convert string to html object
 * @param { html string } string
 * @returns { html object }
 */
function createDOM(string) {
    var temp = document.createElement("div");
    temp.innerHTML = string;
    var htmlObject = temp.firstChild;
    return htmlObject;
}

/**
 * check to include a element
 *
 * @param { all element } a
 * @param { element to find } b
 * @returns { boolean }
 */
function collectionHas(a, b) {
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] == b) return true;
    }
    return false;
}

export { createDOM, collectionHas };
