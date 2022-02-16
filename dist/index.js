"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var currencySelect = document.querySelector('.converter__select');
var currencyCount = document.querySelector('.converter__input');
var outputBlock = document.querySelector('.converter__labels');
var datePicker = document.querySelector('#date');
var currency = {
  BYN: 1,
  USD: 0.39,
  EUR: 0.34,
  RUB: 29.28,
  CNY: 2.48
};

var createLabel = function createLabel(data) {
  var label = document.createElement('label');
  label.textContent = "".concat(data.value, " ").concat(data.name);
  return label;
};

var calculate = function calculate() {
  var selected = currencySelect.value;
  var result = [];
  var convertedToBYN = 0;
  var sum = 0;

  for (var _key in currency) {
    if (selected !== 'BYN') {
      convertedToBYN = +(+currencyCount.value / currency[selected]).toFixed(2);
      sum = +convertedToBYN * currency[_key];
    } else {
      sum = +currencyCount.value * currency[_key];
    }

    result.push({
      name: _key,
      value: (Math.ceil(sum * 100) / 100).toFixed(2)
    });
  }

  result = result.filter(function (item) {
    return item.name !== selected;
  });
  outputBlock.textContent = '';
  outputBlock.append.apply(outputBlock, _toConsumableArray(result.map(createLabel)));
};

document.addEventListener('DOMContentLoaded', function () {
  calculate();
  currencySelect === null || currencySelect === void 0 ? void 0 : currencySelect.addEventListener('change', calculate);
  currencyCount.addEventListener('input', calculate);
});