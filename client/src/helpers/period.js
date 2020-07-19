const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
const currentDay = date.getDate();
const currentDate = `${currentYear}-${('0' + currentMonth).slice(-2)}-${('0' + currentDay).slice(-2)}`;
const years = [currentYear - 1, currentYear, currentYear + 1];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthsName = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];
const currentPeriod = `${currentYear}-${('0' + currentMonth).slice(-2)}`;

const periods = [];

for (const year of years) {
  for (const month of months) {
    periods.push({ value: `${year}-${('0' + month).slice(-2)}`, text: `${monthsName[month - 1].substr(0, 3)}/${year}` });
  }
}

export { periods, currentPeriod, currentDate };
