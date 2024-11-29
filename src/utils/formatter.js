export const formatArs = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });



export const formatDate = (date) => {
    const day = date.day.toString().padStart(2, '0');
    const month = date.month.toString().padStart(2, '0');
    const year = date.year;
    const dateObj = new Date(`${year}-${month}-${day}`)
    const formattedDate = dateObj.toISOString().slice(0, 19).replace('T', ' ') + '.000 +00:00'
    return formattedDate
  } 