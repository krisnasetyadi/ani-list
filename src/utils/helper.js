export function hasProperty(dataObject, property) {
  return Object.hasOwnProperty.call(dataObject, property);
}
export function getNestedObject(nestedObj, pathArr) {
  return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), nestedObj);
}

export function capitalize(word) {
  if (word && typeof word === 'string') {
    // ^ matches the beginning of the string.
    // \w matches any word character.
    // {1} takes only the first character.
    // Thus, ^\w{1} matches the first letter of the word.
    // | works like the boolean OR. It matches the expression after and before the |.
    // \s+ matches any amount of whitespace between the words (for example spaces, tabs, or line breaks).
    return word.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }
  return word;
}

export function calculateText(text) {
  const canvas = calculateText.widht || (calculateText.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  const metrics = context.measureText(text);

  return [metrics.width, text];
}
export function toCalculate(data, type) {
  let total = 0;
  for (let i = 0; i < data.length; i += 1) {
    total +=
      typeof data[i][type] === 'string' && data[i][type].length !== 0
        ? parseFloat(data[i][type])
        : typeof data[i][type] === 'number'
        ? data[i][type]
        : 0;
  }
  return total;
}

export const rewriteString = (text: string): string => {
    if (text) {
      const splitted = text.trim().split(' ');
  
      const masked = splitted.map(s => {
        let string = ''
        let mask = ''
        if (s.length > 2) {
          string = s.substring(0, 2);
          mask = s.substring(2, s.length).replace(/\w/g, '*');
        }
        if (s.length <= 2) {
          if (s.length === 1) {
            return s;
          }
          string = s.substring(0, 1);
          mask = s.substring(1, s.length).replace(/\w/g, '*');
        }
        return string + mask;
      });
      return masked.join(' ');
    }
    return '';
}

export const cardNumberFormat = (cardNumber: string | number, eachLength: number): string => {
    if(cardNumber && eachLength) {
  const digitsOnly = String(cardNumber).replace(/\D/g, '');
  const pattern = new RegExp(`.{1,${eachLength}}`, 'g');
  const groups = digitsOnly.match(pattern) || [];
  return groups.join('-');
  }
 return ''
}

export const thousandSeperator = (number: string | number): string => {
    const options = {
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      };
      const formattedNum = number.toLocaleString('en-US', options);
      
      return formattedNum
}

