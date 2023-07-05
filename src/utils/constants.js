import { baseRenderer } from 'handsontable/renderers';
export const data = [{
    companyName: true,
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: false,
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, {
    companyName: "Tagcat",
    country: "United Kingdom",
    name: "Classic Vest",
    sellDate: "11/10/2020",
    quantity: "172",
}, ]

export const progressBarRenderer = (...args) => {
    const [
        instance,
        td,
        row,
        column,
        prop,
        value,
        cellProperties
    ] = args;

    baseRenderer(...args);
    if (value) {
        td.innerHTML = `<div class="circle critical"></div>`
    } else {
        td.innerHTML = `<div class="circle"></div>`
    }
};