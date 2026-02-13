const data = {
  marketplaces: [
    ['Wildberries', 130, 50],
    ['Рейтинг ПВЗ 5.0', '', 150],
    ['OZON', 130, 50],
    ['Яндекс.Маркет', 150, 50],

    ['Золотое Яблоко', 130, 50],
  ],
  real_estate: [
    ['OZON Hotels', 500, 250],
    ['Суточно', 500, 250],
    ['Островок', 500, 250],
    ['Booking', 750, 250],
  ],
  maps: [
    ['2GIS', 750, 250],
  ],
}

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('product-price')
  const span = document.getElementById('price-display')

  function formatNumberWithSpaces(numberString) {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  function updateDisplay() {
    const value = input.value
    if (value) {
      span.textContent = `${formatNumberWithSpaces(value)} ₽`
      span.classList.add('active')
    } else {
      span.textContent = 'Введите стоимость товара, ₽'
      span.classList.remove('active')
    }
  }

  input.addEventListener('input', updateDisplay)
  updateDisplay()
})

function updateTable(category) {
  const tbody = document.getElementById('tariff-body')
  const cardsContainer = document.getElementById('tariff-cards')

  tbody.innerHTML = ''
  cardsContainer.innerHTML = ''

  data[category].forEach((row, index) => {
    const tr = document.createElement('tr')
    tr.style.animationDelay = `${(index + 1) * 0.1}s`
    row.forEach((cell, indexCell) => {
      const td = document.createElement('td')
      td.textContent = indexCell === 0 ? `${cell}, руб./ед` : cell
      tr.appendChild(td)
    })
    tbody.appendChild(tr)

    const card = document.createElement('div')
    card.className = 'tariff__card'
    card.style.animationDelay = `${(index + 1) * 0.1}s`

    const platformInfo = document.createElement('div')
    platformInfo.className = 'tariff__card-info'
    platformInfo.innerHTML = `
        <p class="tariff__card-title">Площадка</p>
        <p class="tariff__card-value">${row[0]}, руб./ед</p>
        `

    const divider = document.createElement('div')
    divider.className = 'divider'

    const cardContainer = document.createElement('div')
    cardContainer.className = 'tariff__card-container'

    const buyoutInfo = document.createElement('div')
    buyoutInfo.className = 'tariff__card-info'
    buyoutInfo.innerHTML = `
            <p class="tariff__card-title">Самовыкуп</p>
            <p class="tariff__card-value">${row[1]}</p>
        `

    const reviewInfo = document.createElement('div')
    reviewInfo.className = 'tariff__card-info'
    reviewInfo.innerHTML = `
            <p class="tariff__card-title">Отзыв</p>
            <p class="tariff__card-value">${row[2]}</p>
        `

    const discountInfo = document.createElement('div')
    discountInfo.className = 'tariff__card-info'


    cardContainer.appendChild(buyoutInfo)
    cardContainer.appendChild(reviewInfo)
    cardContainer.appendChild(discountInfo)

    card.appendChild(platformInfo)
    card.appendChild(divider)
    card.appendChild(cardContainer)

    cardsContainer.appendChild(card)
  })
}
document.querySelectorAll('.toggle-btn').forEach((button) => {
  button.addEventListener('click', function () {
    document
      .querySelectorAll('.toggle-btn')
      .forEach((btn) => btn.classList.remove('active'))
    this.classList.add('active')
    updateTable(this.dataset.category)
  })
})

updateTable('marketplaces')

const servicePrices = {}
const platformSelect = document.getElementById('platform-select')

Object.keys(data).forEach((category) => {
  data[category].forEach((row) => {
    servicePrices[row[0]] = { buyout: row[1], review: row[2] }

    const option = document.createElement('option')
    option.value = row[0]
    option.textContent = row[0]
    platformSelect.appendChild(option)
  })
})

function calculateTotal() {
  const platform = platformSelect.value
  const productPrice =
    parseFloat(document.getElementById('product-price').value) || 0
  const quantity =
    parseInt(document.getElementById('purchase-quantity').value) || 0

  const totalProductPrice = document.getElementById('total-product-price')
  const totalServicePrice = document.getElementById('total-service-price')
  const totalPrice = document.getElementById('total-price')

  if (!servicePrices[platform]) {
    totalProductPrice.textContent = '0 ₽'
    totalServicePrice.textContent = '0 ₽'
    totalPrice.textContent = '0 ₽'
    return
  }

  const serviceCost =
    (servicePrices[platform].buyout + servicePrices[platform].review) * quantity
  const productCost = productPrice * quantity
  const totalCost = serviceCost + productCost

  totalProductPrice.textContent = `${productCost.toLocaleString()} ₽`
  totalServicePrice.textContent = `${serviceCost.toLocaleString()} ₽`
  totalPrice.textContent = `${totalCost.toLocaleString()} ₽`
}

platformSelect.addEventListener('change', calculateTotal)
document
  .getElementById('product-price')
  .addEventListener('input', calculateTotal)
document
  .getElementById('purchase-quantity')
  .addEventListener('input', calculateTotal)
