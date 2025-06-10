export function getExpiryDate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
  
    const expiryMonth = (currentMonth + 3) % 12 === 0 ? 12 : (currentMonth + 3) % 12;
    const expiryYear = currentYear + Math.floor((currentMonth + 3 - 1) / 12);
  
    return `${String(expiryMonth).padStart(2, '0')}/${String(expiryYear)}`;
  }