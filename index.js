$(() => {
    const valueInput = $('#valueInput');
    const fromScaleUnit = $('#fromScaleUnit');
    const toScaleUnit = $('#toScaleUnit');
    const convertButton = $('#convert');
    const resultText = $('#result');

    // ============================================================================================
    // Add conversions here
    const conversion = [
        // You can reference functions
        { from: 'something', to: 'nothing', convertFunc: fromSthToNth },

        // You can specify inline conversions
        { from: 'something', to: 'nothing', convertFunc: value => NaN },
    ];
    
    function fromMeterToCentimeter(value) {
        return value * 100;
    }
    // ============================================================================================

    conversion.forEach(c => fromScaleUnit.append($('<option>', { text: c.from })));
    fromScaleUnit.val(conversion[0].from);
    refreshToSelect();
    fromScaleUnit.change(refreshToSelect);

    convertButton.click(() => {
        if (valueInput.val() && fromScaleUnit.val() && toScaleUnit.val()) {
            const result = conversion
                .find(c => c.from === fromScaleUnit.val() && c.to == toScaleUnit.val())
                .convertFunc(valueInput.val());
            resultText.text(`The result is ${result}`);
        }
    });

    function refreshToSelect() {
        toScaleUnit.find('option').remove();
        conversion.filter(c => c.from === fromScaleUnit.val())
            .forEach(c => toScaleUnit.append($('<option>', { text: c.to })));
    }
});
