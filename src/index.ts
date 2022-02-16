const currencySelect = <HTMLSelectElement>document.querySelector('.converter__select');
const currencyCount = <HTMLInputElement>document.querySelector('.converter__input');
const outputBlock = <Element>document.querySelector('.converter__labels');
const datePicker = <HTMLDataElement>document.querySelector('#date');

const currency: { [key: string | number]: number } = {
    BYN: 1,
    USD: 0.39,
    EUR: 0.34,
    RUB: 29.28,
    CNY: 2.48
}

interface IFilterCurrency {
    name: string,
    value: string
}

const createLabel = (data: IFilterCurrency) => {
    const label = document.createElement('label');
    label.textContent = `${data.value} ${data.name}`;
    return label;
}

const calculate = () => {
    let selected: string = currencySelect.value;
    let result: IFilterCurrency[] = [];
    let convertedToBYN: number = 0;
    let sum: number = 0;

    for (let key in currency) {
        if (selected !== 'BYN') {
            convertedToBYN = +(+currencyCount.value / currency[selected]).toFixed(2);
            sum = +convertedToBYN * currency[key];
        } else {
            sum = +currencyCount.value * currency[key];
        }

        result.push({ name: key, value: (Math.ceil(sum * 100) / 100).toFixed(2) })
    }

    result = result.filter(item => item.name !== selected);
    outputBlock.textContent = '';
    outputBlock.append(...result.map(createLabel));
}


document.addEventListener('DOMContentLoaded', () => {
    calculate();
    currencySelect?.addEventListener('change', calculate);
    currencyCount.addEventListener('input', calculate);
});