document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formCliente');
    const producID = document.getElementById('ProducID');
    const producNom = document.getElementById('ProducNom');
    const producValor = document.getElementById('ProducValor');
    const barcodeElement = document.getElementById('barcode');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let valid = true;

        // Validar ID del producto
        if (producID.value.length > 28 || !/^\d+$/.test(producID.value)) {
            valid = false;
            producID.style.borderColor = 'red';
            producID.setCustomValidity('El ID del producto debe tener un máximo de 28 caracteres y solo contener números.');
        } else {
            producID.style.borderColor = '';
            producID.setCustomValidity('');
        }

        // Validar nombre del producto
        if (producNom.value.trim() === '') {
            valid = false;
            producNom.style.borderColor = 'red';
            producNom.setCustomValidity('Este campo es obligatorio.');
        } else {
            producNom.style.borderColor = '';
            producNom.setCustomValidity('');
        }

        // Validar valor del producto
        if (producValor.value.trim() === '' || !/^\d+$/.test(producValor.value)) {
            valid = false;
            producValor.style.borderColor = 'red';
            producValor.setCustomValidity('El valor del producto debe ser un número.');
        } else {
            producValor.style.borderColor = '';
            producValor.setCustomValidity('');
        }

        // Si todos los campos son válidos, se puede proceder a generar el código de barras
        if (valid) {
            JsBarcode(barcodeElement, producID.value, {
                format: "CODE128",
                displayValue: true
            });
        }
    });

    // Remover mensajes de error al modificar los campos
    [producID, producNom, producValor].forEach(input => {
        input.addEventListener('input', function() {
            input.style.borderColor = '';
            input.setCustomValidity('');
        });
    });


    // Validar que el valor del producto solo contenga números
    producValor.addEventListener('input', function() {
        let value = producValor.value;
        if (!/^\d*$/.test(value)) {
            producValor.value = value.replace(/\D/g, '');
        }
    });
});

function limpiar() {
    document.getElementById('form-register').reset();

}