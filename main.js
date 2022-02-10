const el_p = document.querySelector("#p");
const el_q = document.querySelector("#q");
const el_randomBtn = document.querySelector("#randomBtn");
const el_generateKeyBtn = document.querySelector("#generateKey");
const el_privateKey = document.querySelector("#privateKey");
const el_publicKey = document.querySelector("#publicKey");
const el_pickFIleBtn = document.querySelector("#pickFIleBtn");
const el_file_store = document.querySelector("#file-store");
const el_text1 = document.querySelector("#text1");
const el_signText = document.querySelector("#signText");
const el_signBtn = document.querySelector("#signBtn");
const el_exBtn = document.querySelector("#exBtn");

const el_pickFIleBtn2 = document.querySelector("#pickFIleBtn2");
const el_file_store2 = document.querySelector("#file-store2");
const el_text2 = document.querySelector("#text2");
const el_signText2 = document.querySelector("#signText2");
const el_signBtn2 = document.querySelector("#signBtn2");
const el_exBtn2 = document.querySelector("#exBtn2");

const el_showPrivate = document.querySelector("#showPrivate");

let sign = "";

let signEx = "";

let privateKey = "";
let showPrivate = false;

el_showPrivate.addEventListener("click", () => {
  if (showPrivate) {
    el_privateKey.value = privateKey;
  } else {
    console.log(privateKey);
    el_privateKey.value = privateKey
      .toString()
      .split("")
      .map((x) => "*")
      .join("");
  }
  showPrivate = !showPrivate;
});

el_pickFIleBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  el_file_store2.click();
});
el_file_store2.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    el_text2.value = e.target.result;
  };
  reader.readAsText(file);
});

el_signBtn2.addEventListener("click", (e) => {
  e.preventDefault();

  const p = parseInt(el_p.value);
  const q = parseInt(el_q.value);
  const n = p * q;

  const arr = el_text2.value.split(" ");
  const d = el_publicKey.value;
  const result = arr.map((item) => {
    return Number(bigInt(parseInt(item)).pow(d).mod(n).value);
  });

  signEx = result.join(" ");
});

el_signBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const p = parseInt(el_p.value);
  const q = parseInt(el_q.value);
  const n = p * q;

  const arr = el_text1.value.split(" ");
  const eA = privateKey;

  const result = arr.map((item) => {
    return Number(bigInt(parseInt(item)).pow(eA).mod(n).value);
  });

  sign = result.join(" ");
});
el_exBtn2.addEventListener("click", (e) => {
  el_signText2.value = signEx;
  download("__sign.txt", signEx);
});
el_exBtn.addEventListener("click", (e) => {
  el_signText.value = sign;
  download("sign.txt", sign);
});
el_pickFIleBtn.addEventListener("click", (e) => {
  el_file_store.click();
});

el_file_store.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    el_text1.value = event.target.result;
  };
  reader.onerror = (error) => reject(error);
  reader.readAsText(el_file_store.files[0]);
});

el_randomBtn.addEventListener("click", (e) => {
  e.preventDefault();
  el_p.value = getRandPrime(0, 1000);
  el_q.value = getRandPrime(0, 1000);
});
console.log(bigInt(7).pow(-2));
el_generateKeyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const p = parseInt(el_p.value);
  const q = parseInt(el_q.value);
  const n = p * q;

  const tela_n = (p - 1) * (q - 1);

  let d = -1;
  let eA;
  while (d < 0) {
    eA = getRandPrime(2, tela_n);
    while (tela_n % eA == 0) {
      eA = getRandPrime(2, tela_n);
    }
    //d*eA = 1 mod(tela_n)
    d = cald(eA, tela_n);
  }

  el_publicKey.value = d;
  el_privateKey.value = eA;
  privateKey = eA;
});

//helper

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function cald(a, b) {
  if (a < b) [a, b] = [b, a];
  let s = 0,
    old_s = 1;
  let t = 1,
    old_t = 0;
  let r = b,
    old_r = a;
  while (r != 0) {
    let q = Math.floor(old_r / r);
    [r, old_r] = [old_r - q * r, r];
    [s, old_s] = [old_s - q * s, s];
    [t, old_t] = [old_t - q * t, t];
  }
  return old_t;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const getPrimes = (min, max) => {
  const result = Array(max + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 2; i <= Math.sqrt(max + 1); i++) {
    for (let j = i ** 2; j < max + 1; j += i) delete result[j];
  }
  return Object.values(result.slice(Math.max(min, 2)));
};

const getRandNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandPrime = (min, max) => {
  const primes = getPrimes(min, max);
  return primes[getRandNum(0, primes.length - 1)];
};

function lcm_two_numbers(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}
