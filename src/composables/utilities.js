export const utilities = () => {

  const formatMoney = (value) => {

    const number = parseFloat(value);

    if (number === undefined) return 0;

    if (number % 1 === 0) {

      return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

    } else {

      return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

    }

  }

  return { formatMoney };

}
