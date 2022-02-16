const currencySelect = <HTMLSelectElement>document.querySelector('.converter__select');
const currencyCount = <HTMLInputElement>document.querySelector('.converter__input');
const outputBlock = <Element>document.querySelector('.converter__labels');

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

const createLabel = (data: IFilterCurrency): Element => {
    const label = document.createElement('label');
    label.textContent = `${data.value} ${data.name}`;
    return label;
}

const calculate = (): void => {
    let selected: string = currencySelect.value;
    let result: IFilterCurrency[] = [];
    let converted: number = 0;
    let sum: number = 0;

    for (let key in currency) {
        if (selected !== 'BYN') {
            converted = +(+currencyCount.value / currency[selected]).toFixed(2);
            sum = +converted * currency[key];
        } else {
            sum = +currencyCount.value * currency[key];
        }

        result.push({
            name: key,
            value: (Math.ceil(sum * 100) / 100).toFixed(2)
        });
    }

    result = result.filter(item => item.name !== selected);
    outputBlock.textContent = '';
    outputBlock.append(...result.map(createLabel));
}

const checkValue = (e: any): void => {
    if (!Number(e.target.value)) {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    calculate();
    currencyCount.addEventListener('input', checkValue);
    currencyCount.addEventListener('input', calculate);
    currencySelect.addEventListener('change', calculate);
});