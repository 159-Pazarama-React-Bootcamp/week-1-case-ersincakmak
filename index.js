const isCreditCardNumberValid = (cardNumber) => {
  let isValid = true;
  let message = "Card number is Valid.";

  // Burada "-" ifadesini stringden çıkarma işlemini gerçekleştiriyoruz
  // regex kullanmamaımz istendiği için "-" ifadesini sadece 4 lü karakter arasında olup
  // olmama durumunun kontrolünü gerçekleştirmedim ne kadar "-" ifadesi kullanırsak hepsi geçersiz sayılacak
  // regex ile sadece 4 lü karakter arasında olup olmama durumu kontrolü de yapılaiblirdi
  const cardNumberString = cardNumber.trim().split("-").join("");
  // Burada elde ettiğimiz string ifadeyi harflerine bölerek arraye dönüştürüyoruz
  const cardNumberArray = cardNumberString.split("");

  // kart numarasının sayılardan oluşup oluşmadığı kontrolü
  if (!Number(cardNumberString)) {
    isValid = false;
    message = "Card number must be number.";
    // kart numarasının uzunluğunun 16 olup olmama durumu kontrolü
  } else if (cardNumberString.length !== 16) {
    isValid = false;
    message = "Card number length must be equal to 16.";
    // kart numarasında en az 2 farklı karakter kontrolü
  } else if (!([...new Set(cardNumberArray)].length > 1)) {
    isValid = false;
    message = "Card number must have at least 2 unique values.";
    // son sayının çift olup olmama durum kontrolü
  } else if (Number(cardNumberArray[15]) % 2 !== 0) {
    isValid = false;
    message = "The last digit of card number must be even.";
    // kart numarasındaki sayıların toplamının 16 dan büyük olup olmama durumu kontrolü
  } else if (
    !(cardNumberArray.reduce((acc, val) => acc + Number(val), 0) > 16)
  ) {
    cardNumberString;
    isValid = false;
    message =
      "The sum of all digits in the card number must be greater than 16.";
  }

  return {
    isValid,
    message,
  };
};

// gerekli elementlerin id selectörü ile seçilmesi
const input = document.getElementById("checker-input");
const button = document.getElementById("checker-btn");
const root = document.getElementById("root");

// girilen değerin sonucuna göre çıktı oluşturma fonksiyonu
const renderResult = () => {
  const resultElement = document.getElementById("result");

  const value = isCreditCardNumberValid(input.value ?? "");

  // eğer daha önceden bir result elementi oluşturulduysa tekrardan oluşturulmuyor
  const result = resultElement ?? document.createElement("div");

  // id ekleyerek elementin tekrardan root a eklenmesini önlüyoruz
  // vanilla js kullanarak bunun önlenmesinin best practice ini bilmiyorum
  result.id = "result";
  result.className = "";
  result.classList.add(value.isValid ? "valid" : "invalid");
  result.innerText = value.message;
  root.appendChild(result);

  input.focus();
};

// buttona tıklandığında veya focus olduğunda entera basılma durumunda sonucun render edilmesi
button.addEventListener("click", () => {
  renderResult();
});

// input üzerindeyken entera basıldığında sonucun render edilmesi
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderResult();
  }
});
