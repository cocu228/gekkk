export function maskCreditCard(cardNumber: string) {
  // Проверяем, что cardNumber является строкой
  if (typeof cardNumber !== 'string') {
    throw new TypeError('Номер карты должен быть строкой')
  }

  // Убираем все нецифровые символы из строки
  const digitsOnly = cardNumber.replace(/\D/g, '')

  // Проверяем, что в итоговой строке есть хотя бы 4 цифры
  if (digitsOnly.length < 4) {
    throw new Error('Номер карты должен содержать хотя бы 4 цифры')
  }

  // Оставляем только последние 4 цифры и добавляем две звездочки перед ними
  const maskedNumber = '**' + digitsOnly.slice(-4)

  return maskedNumber
}
