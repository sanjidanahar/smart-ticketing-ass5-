
let seatSelectionLimit = 0
let totalSeats = 40

// poribohon
let seatings = document.querySelectorAll("#seats .btn")
let seatsLeftCounter = document.getElementById("seats-left")
let seatCount = document.getElementById("seat-count")
let checkoutTable = document.querySelector("#checkout-table tbody")
let totalPrice = document.getElementById("total-price")
let discount = document.getElementById("discount")
let couponApply = document.getElementById("coupon-apply")
let grandTotal = document.getElementById("grand-total")
let contactFormSubmitBtn = document.getElementById("apply")
let successMsg = document.getElementById("success-msg")
let continueBtn = document.getElementById("continue")


// remove all data after submit
let removeData = () => {

  seatSelectionLimit = 0
  totalSeats = 40

  // remove counters
  seatsLeftCounter.textContent = "40"
  seatCount.textContent = "0"

  // remove checkout table data
  let tableData = document.querySelectorAll("#checkout-table .data")
  tableData.forEach(function (element) {
    element.remove();
  })

  // uncheck seats
  seatings.forEach((btn) => {
    if(btn.classList.contains('clicked')){
      btn.classList.remove('clicked')
    }
  })

  // remove checkout data
  discount.textContent = "0"
  totalPrice.textContent = "0"
  grandTotal.textContent = "0"

  // remove contact form data
  document.getElementById("name").value = 0
  document.getElementById("phone").value = 0
  document.getElementById("email").value = 0

}

// remove success msg with continue button
continueBtn.addEventListener('click', () => {
  successMsg.classList.add("opacity-0")
  successMsg.classList.add('invisible')

  removeData()
})

// submit contact form
contactFormSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  let name = document.getElementById("name").value
  let phone = document.getElementById("phone").value

  if (name == "" || phone == "") {
    return alert("Please fill all the details")
  }

  successMsg.classList.remove("opacity-0")
  successMsg.classList.remove('invisible')

  // remove all data after submit
  removeData()

  setTimeout(() => {
    successMsg.classList.add("opacity-0")
    successMsg.classList.add('invisible')
  }, 5000)

})

// seat checkout info markup
let markup = (id) => {
  let htmlData = `
    <tr class="data font-normal text-gray-500" id="${id}">
      <td class="text-left uppercase">${id}</td>
      <td class="text-center"><span>Economy</span></td>
      <td class="text-right"><span>550</span></td>
    </tr>
  `

  return htmlData
}

// coupon apply
couponApply.addEventListener('click', (e) => {
  e.preventDefault()
  let couponCode = document.getElementById("coupon").value
  if (couponCode.trim() == "") return alert("please apply a coupon")
  checkoutCalculator(couponCode)
})

// coupon check
let coupon = (code, price) => {

  if (code == "NEW15") {
    return (15 / 100) * price
  }

  if (code == "Couple 20") {
    return (20 / 100) * price
  }

  return alert("vai code nai")
}

// checkout calculator
let checkoutCalculator = (couponCode) => {
  let price = seatSelectionLimit * 550

  if (couponCode) {
    var discountPrice = coupon(couponCode, price)
    discount.textContent = "" + discountPrice
  }

  totalPrice.textContent = "" + price
  if (discountPrice) return grandTotal.textContent = "" + (price - discountPrice)
  grandTotal.textContent = "" + price
}


// look over all the buttons
seatings.forEach((btn) => {

  // check for any click event of the buttons
  btn.addEventListener('click', (e) => {

    // if clicked before
    if (btn.classList.contains('clicked')) {
      seatSelectionLimit--
      totalSeats++
      seatsLeftCounter.textContent = "" + totalSeats
      seatCount.textContent = "" + seatSelectionLimit

      let generatedElement = document.getElementById("" + e.target.value)
      if (generatedElement) generatedElement.remove()

      checkoutCalculator() // call calculator function
      if (seatSelectionLimit < 4) couponApply.disabled = true

      return btn.classList.remove("clicked")
    }

    // if not clicked before
    if (seatSelectionLimit < 4) {
      seatSelectionLimit++
      totalSeats--

      seatsLeftCounter.textContent = "" + totalSeats
      seatCount.textContent = "" + seatSelectionLimit

      checkoutTable.insertAdjacentHTML("beforeend", markup(e.target.value)) // insert html
      checkoutCalculator() // call calculator function

      // enable apply button
      if (seatSelectionLimit == 4) couponApply.removeAttribute("disabled")

      return btn.classList.add("clicked")
    }

    alert("You have selected 4 tickets")
  })
})