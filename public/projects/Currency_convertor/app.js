const currOption = document.querySelectorAll("select");
const rateText = document.querySelector(".rate-text");

currOption.forEach((select, index) => {
  Object.entries(countryCurrency).forEach(([country, code]) => {
    const flag = countryFlags[country];
    const option = document.createElement("option");
    option.value = code;
    option.text = code;
    option.setAttribute("data-flag", flag);
    if ((index === 0 && code === "USD") || (index === 1 && code === "INR")) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener("change", updateFlags);
});

function updateFlags() {
  currOption.forEach(select => {
    const selected = select.options[select.selectedIndex];
    const flag = selected.getAttribute("data-flag");
    if (flag) {
      select.style.backgroundImage = `url('https://flagcdn.com/24x18/${flag}.png')`;
      select.style.backgroundRepeat = "no-repeat";
      select.style.backgroundPosition = "left 8px center";
      select.style.paddingLeft = "2.5rem";
    }
  });
}
updateFlags();

document.querySelector('.transfer').addEventListener('click', () => {
    [currOption[0].value, currOption[1].value] = [currOption[1].value, currOption[0].value];
});

// Convert currencies
const fetchConvertedAmount = async (fromCurrency, toCurrency, amount) => {
    const apiKey = `1eeccfb59edc61c8c944107e`;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];

        if (rate) {
            const converted = amount * rate;
            const resultText = `${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`;
            document.querySelector("p").textContent = resultText;
        } else {
            document.querySelector("p").textContent = `Invalid target currency: ${toCurrency}`;
        }

    } catch (error) {
        console.error("API fetch error:", error);
        document.querySelector("p").textContent = "Failed to fetch exchange rate.";
    }
};

document.querySelector(".btn").addEventListener('click', () => {
    const amount = parseFloat(document.getElementById("curr").value);
    const fromCurrency = currOption[0].value;
    const toCurrency = currOption[1].value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    fetchConvertedAmount(fromCurrency, toCurrency, amount);
});

