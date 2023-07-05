import Handsontable from "handsontable";
const SELECTED_CLASS = "selected";
const ODD_ROW_CLASS = "odd";


export const addClassesToRows = (
    TD,
    row,
    column,
    prop,
    value,
    cellProperties
) => {
    // Adding classes to `TR` just while rendering first visible `TD` element
    if (column !== 0) {
        return;
    }

    const parentElement = TD.parentElement;

    if (parentElement === null) {
        return;
    }

    const rowData = cellProperties.instance.getSourceDataAtRow(row);

    // Add class to selected rows
    if (rowData.checked) {
        Handsontable.dom.addClass(parentElement, SELECTED_CLASS);
    } else {
        Handsontable.dom.removeClass(parentElement, SELECTED_CLASS);
    }

    // Add class to odd TRs
    if (row % 2 === 0) {
        Handsontable.dom.addClass(parentElement, ODD_ROW_CLASS);
    } else {
        Handsontable.dom.removeClass(parentElement, ODD_ROW_CLASS);
    }
};


export const drawCheckboxInRowHeaders = function drawCheckboxInRowHeaders(
    row,
    TH
) {
    const input = document.createElement("input");
    const rowData = this.getSourceDataAtRow(row);

    input.type = "checkbox";
    input.checked = !!rowData.checked;

    Handsontable.dom.empty(TH);

    TH.appendChild(input);
};

export function alignHeaders(
    that,
    column,
    TH
) {
    if (column < 0) {
        return;
    }

    if (!TH.firstChild) {
        return;
    }

    const alignmentClass = that.isRtl() ? "htRight" : "htLeft";
    Handsontable.dom.addClass(TH.firstChild, alignmentClass);
}


export const changeCheckboxCell = function changeCheckboxCell(
    event,
    coords
) {
    const target = event.target;

    if (coords.col === -1 && event.target && target.nodeName === "INPUT") {
        event.preventDefault(); // Handsontable will render checked/unchecked checkbox by it own.
        this.setSourceDataAtCell(coords.row, "checked", !target.checked);
    }
};