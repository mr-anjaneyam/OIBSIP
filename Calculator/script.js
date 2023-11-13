let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('btn'));

if (display.innerText === "") {
    display.innerText = "0";
}

function pretty(displayText) {
    if (displayText.indexOf("*") !== -1) {
        displayText = displayText.slice(0, displayText.indexOf("*")) + "×" + displayText.slice(displayText.indexOf("*") + 1);
    }

    if (displayText.indexOf("/") !== -1) {
        displayText = displayText.slice(0, displayText.indexOf("/")) + "÷" + displayText.slice(displayText.indexOf("/") + 1);
    }
    return displayText;
}

buttons.map((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.innerText) {
            case "AC":
                display.innerText = "0";
                break;

            case "=":
                if (display.innerText === "0") {
                    break;
                }
                if (display.innerText.indexOf("×") !== -1) {
                    display.innerText = display.innerText.slice(0, display.innerText.indexOf("×")) + "*" + display.innerText.slice(display.innerText.indexOf("×") + 1);
                }

                if (display.innerText.indexOf("÷") !== -1) {
                    display.innerText = display.innerText.slice(0, display.innerText.indexOf("÷")) + "/" + display.innerText.slice(display.innerText.indexOf("÷") + 1);
                }
                try {
                    let result = eval(display.innerText);
                    if (result.toString().indexOf(".") !== -1) {
                        result = parseFloat(result.toFixed(2));
                    }
                    display.innerText = result;
                } catch {
                    display.innerText = "Error";
                }

                break;

            case "C":
                if (display.innerText === "Error") {
                    display.innerText = "0";
                } else {
                    if (!(display.innerText === "0" && display.innerText.length === 1)) {
                        display.innerText = display.innerText.slice(0, display.innerText.length - 1);
                    }
                    if (display.innerText.length === 0) {
                        display.innerText = "0";
                    }
                }
                break;

            case "+/-":
                display.innerText += "-";
                break;

            default:
                if (display.innerText === "0") {
                    display.innerText = e.target.innerText;
                } else {
                    if (["+", "-", "÷", "*"].includes(e.target.innerText)) {
                        display.innerText += " " + e.target.innerText;
                    } else {
                        display.innerText += e.target.innerText;
                    }
                }
                break;
        }
    });
});
