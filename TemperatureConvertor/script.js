function convertTemperature() {
    var temperature = parseFloat(document.getElementById('temperature').value);
    var fromUnit = document.getElementById('from').value;
    var toUnit = document.getElementById('to').value;

    if (isNaN(temperature)) {
        alert('Please enter a valid temperature.');
        return;
    }

    var result;

    // Perform the conversion
    if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') {
            result = (temperature * 9/5) + 32;
        } else if (toUnit === 'kelvin') {
            result = temperature + 273.15;
        } else {
            result = temperature;
        }
    } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') {
            result = (temperature - 32) * 5/9;
        } else if (toUnit === 'kelvin') {
            result = (temperature - 32) * 5/9 + 273.15;
        } else {
            result = temperature;
        }
    } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') {
            result = temperature - 273.15;
        } else if (toUnit === 'fahrenheit') {
            result = (temperature - 273.15) * 9/5 + 32;
        } else {
            result = temperature;
        }
    }

    document.getElementById('result').innerHTML = `Result: ${result.toFixed(2)} ${toUnit}`;
}