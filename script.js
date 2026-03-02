const display = document.getElementById("display");
const buttons = document.querySelectorAll("[data-value]");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        display.value += button.dataset.value;
    });
});

clearBtn.addEventListener("click", () => {
    display.value = "";
});

equalsBtn.addEventListener("click", () => {
    try {
        display.value = calcular(display.value);
    } catch {
        display.value = "Erro";
    }
});

function calcular(expressao) {
    return Function("return " + expressao)();
}
