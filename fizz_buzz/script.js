(function FizzBuzzProject() {
  // 値の検証で使う
  const validation = (fizzNum, buzzNum) => {
    let flag = false;
    if (fizzNum === "" || buzzNum === ""){
      appendHtml("error", "入力がされていないところがあります")
      flag = true;
    } else if (fizzNum.match(/[^0-9]+/) || buzzNum.match(/[^0-9]+/)) {
      appendHtml("error", "整数値でない入力があります")
      flag = true;
    }
    return flag;
  }

  // append用の関数
  const appendHtml = (key, num) => {
    const li = document.createElement("li");
    li.setAttribute("class", key);
    li.innerHTML = `${key}：${num}`;
    resultBox.appendChild(li);
  }

  // 変数の定義
  const fizzInput = document.getElementById("fizz")
  const buzzInput = document.getElementById("buzz")
  const btn = document.getElementById("btn")
  const resultBox = document.getElementById("result")

  // イベントの発火
  btn.addEventListener("click", () => {
    resultBox.textContent = "";
    const fizzNum = fizzInput.value;
    const buzzNum = buzzInput.value;
    const validationFrag = validation(fizzNum, buzzNum) /* 値の検証 */
    if (validationFrag === true) {
      return false;
    }
    for (num = 1; num<= 100; num++){
      if (num % fizzNum === 0 && num % buzzNum === 0){
        appendHtml("fizz-buzz", num)        
      } else if (num % fizzNum === 0){
        appendHtml("fizz", num)
      } else if (num % buzzNum === 0) {
        appendHtml("buzz", num)
      }
    }
  });
})();


