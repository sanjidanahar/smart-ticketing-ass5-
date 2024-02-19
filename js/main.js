// buy ticket
const seats = tag("button", id("seats"));
const selectedSeats = [];
const SEAT_PRICE = 550;
let total_price = 0;
const coupons = {
  NEW15: 15,"Couple 20": 20,
};

// poribohon
for (const seat of seats) {
  let seatName = seat.innerHTML;
  seat.id = seatName;
  seat.style.width = id("circle").offsetWidth + "px";
  seat.onclick = function () {
    if (selectedSeats.includes(seatName)) {
      seat.classList.remove("bg-[#1DD100]");
      selectedSeats.splice(selectedSeats.indexOf(seatName), 1);
    } else {
      if (selectedSeats.length < 4) {
        seat.classList.add("bg-[#1DD100]");
        selectedSeats.push(seatName);
      } else {
        alert("You already have selected 4 seats!");
      }
    }
    const seatsCount = selectedSeats.length;
    id("seat-count").innerHTML = seatsCount;
    id("seats-left").innerHTML = 40 - seatsCount;
    id("selected-list").innerHTML = selectedSeats
      .map(
        (selectedSeat) =>
          `<div class="flex justify-between border-gray-300 text-gray-700"><span>${selectedSeat}</span><span>Economoy</span><span>550</span></div>`
      )
      .join("");
    total_price = seatsCount * SEAT_PRICE;
    id("total-price").innerHTML = total_price;
    id("grand-total").innerHTML = total_price;
    id("discount").innerHTML = 0;
    if (seatsCount === 4) {
      id("coupon-apply").removeAttribute("disabled");
    } else {
      id("coupon-apply").setAttribute("disabled", "");
    }
    applyBtn();
  };
}
id("coupon-apply").onclick = function () {
  for (const coupon in coupons) {
    if (coupon === id("coupon").value) {
      const discount = (coupons[coupon] * total_price) / 100;
      id("discount").innerHTML = discount;
      id("grand-total").innerHTML = parseInt(total_price - discount);
      id("coupon-apply").parentElement.classList.add("hidden");
      return;
    }
  }
  alert("invalid coupon");
};

id("apply").onclick = function () {
  if (selectedSeats.length === 0) {
    alert("Please select a seat!");
    id("A1").focus();
  } else if (id("phone").value.toString().length === 0) {
    alert("Please Enter your phone number");
    id("phone").focus();
  } else if (id("name").value.toString().length === 0) {
    alert("Please Enter your name");
    id("name").focus();
  } else {
    id("done").showModal();
  }
};

id("phone").onchange = () => applyBtn();
id("phone").oninput = () => applyBtn();
id("name").oninput = () => applyBtn();
id("name").onchange = () => applyBtn();
function applyBtn() {
  if (
    selectedSeats.length !== 0 &&
    id("phone").value.toString().length !== 0 &&
    id("name").value.toString().length !== 0
  ) {
    id("apply").classList.add("bg-[#1DD100]");
  } else {
    id("apply").classList.remove("bg-[#1DD100]");
  }
}


const id = (e, p = document) => p.getElementById(e);
const tag = (e, p = document) => p.getElementsByTagName(e);
