document.addEventListener("DOMContentLoaded", function() {
    const formcliente = document.getElementById("formcliente");

    const inputsToValidate = [
        { element: document.getElementById('nome'), errorSpan: null, message: 'O nome é obrigatório.' },
        { element: document.getElementById('cpf'), errorSpan: document.getElementById('cpf-erro'), message: 'Formato de CPF inválido (ex: XXX.XXX.XXX-YY).' },
        { element: document.getElementById('rg'), errorSpan: document.getElementById('rg-erro'), message: 'Formato de RG inválido (ex: XX.XXX.XXX-Y ou XX.XXX.XXX-YY).' },
        { element: document.getElementById('telefone'), errorSpan: document.getElementById('telefone-erro'), message: 'Formato de telefone inválido (ex: (XX)XXXX-XXXX ou (XX)XXXXX-XXXX).' },
        { element: document.getElementById('e-mail'), errorSpan: document.getElementById('email-erro'), message: 'Formato de e-mail inválido (ex: seuemail@dominio.com).' },
        { element: document.getElementById('estado'), errorSpan: null, message: 'O estado é obrigatório.' },
        { element: document.getElementById('cidade'), errorSpan: null, message: 'A cidade é obrigatória.' },
        { element: document.getElementById('bairro'), errorSpan: null, message: 'O bairro é obrigatório.' },
        { element: document.getElementById('rua'), errorSpan: null, message: 'A rua é obrigatória.' },
        { element: document.getElementById('cep'), errorSpan: document.getElementById('cep-erro'), message: 'Formato de CEP inválido (ex: XXXXX-XXX).' }
    ];

    function validateField(inputElement, errorSpanElement) {
        if (!inputElement) return true;

        if (inputElement.checkValidity()) {
            if (errorSpanElement) {
                errorSpanElement.textContent = '';
            }
            inputElement.classList.remove('invalid');
            return true;
        } else {
            if (errorSpanElement) {
                let errorMessage = inputElement.validationMessage;

                const fieldConfig = inputsToValidate.find(f => f.element === inputElement);
                
                if (fieldConfig && (inputElement.validity.patternMismatch || inputElement.validity.valueMissing)) {
                    errorMessage = fieldConfig.message;
                }

                errorSpanElement.textContent = errorMessage;
            }
            inputElement.classList.add('invalid');
            return false;
        }
    }

    inputsToValidate.forEach(field => {
        if (field.element) {
            field.element.addEventListener('input', function() {
                validateField(field.element, field.errorSpan);
            });
            
            field.element.addEventListener('blur', function() {
                validateField(field.element, field.errorSpan);
            });
        }
    });

    formcliente.addEventListener("submit", async function (e) {
        e.preventDefault();

        let allFieldsValid = true;

        inputsToValidate.forEach(field => {
            if (field.element && !validateField(field.element, field.errorSpan)) {
                allFieldsValid = false;
            }
        });

        if (!allFieldsValid) {
            alert('Por favor, corrija os erros nos campos antes de cadastrar.');
            return;
        }

        const cliente = {
            nome: document.getElementById("nome").value,
            cpf: document.getElementById("cpf").value,
            rg: document.getElementById("rg").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("e-mail").value,
            estado: document.getElementById("estado").value,
            cidade: document.getElementById("cidade").value,
            bairro: document.getElementById("bairro").value,
            rua: document.getElementById("rua").value,
            cep: document.getElementById("cep").value
        };

        try {
            const response = await fetch("/cliente/adicionarcliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                formcliente.reset();
                window.location.href = '/tabelaviagens';
            } else {
                const errorData = await response.json();
                let errorMessage = "Erro ao cadastrar cliente. Código: " + response.status;

                if (errorData && errorData.message) {
                    errorMessage += "\nDetalhes: " + errorData.message;
                } else if (errorData && errorData.errors && errorData.errors.length > 0) {
                    errorMessage += "\nDetalhes: " + errorData.errors.map(err => err.defaultMessage || err.message).join('; ');
                }
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na requisição: " + error.message);
        }
    });
});


