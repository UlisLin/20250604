const form = document.querySelector('#calc-form');
const inputA = document.querySelector('#input-a');
const inputB = document.querySelector('#input-b');
const operator = document.querySelector('#operator');
const result = document.querySelector('#result');
const resetButton = document.querySelector('#reset');

const formatNumber = (value) => {
  if (Number.isNaN(value)) {
    return '錯誤：請輸入有效的數字。';
  }

  return Number.isFinite(value) ? value.toLocaleString('zh-Hant') : '∞';
};

const calculate = (a, b, op) => {
  switch (op) {
    case 'add':
      return a + b;
    case 'subtract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) {
        return null;
      }
      return a / b;
    default:
      return NaN;
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const a = Number.parseFloat(inputA.value);
  const b = Number.parseFloat(inputB.value);
  const op = operator.value;

  if (Number.isNaN(a) || Number.isNaN(b)) {
    result.textContent = '錯誤：請輸入有效的數字。';
    result.classList.add('error');
    return;
  }

  const output = calculate(a, b, op);

  if (output === null) {
    result.textContent = '錯誤：除數不能為 0。';
    result.classList.add('error');
    return;
  }

  result.textContent = `${a.toLocaleString('zh-Hant')} ${operator.options[operator.selectedIndex].textContent.split(' ')[0]} ${b.toLocaleString('zh-Hant')} = ${formatNumber(output)}`;
  result.classList.remove('error');
});

resetButton.addEventListener('click', () => {
  form.reset();
  result.textContent = '請輸入數字並選擇運算。';
  result.classList.remove('error');
  inputA.focus();
});
