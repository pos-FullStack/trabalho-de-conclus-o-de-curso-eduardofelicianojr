module.exports = {
  // Verifica igualdade
  eq: (a, b) => a === b,

  // Verifica se um array inclui determinado valor
  includes: (array, value) => Array.isArray(array) && array.includes(value),

  // Formata data e adiciona tooltip
  formatDateTooltip: (datetime) => {
    if (!datetime) return '';
    const date = new Date(datetime);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const dateStr = `${day}/${month}/${year}`;
    const timeStr = `${hours}:${minutes}`;

    // retorna HTML seguro
    return `<span title="Hora: ${timeStr}">${dateStr}</span>`;
  }
};