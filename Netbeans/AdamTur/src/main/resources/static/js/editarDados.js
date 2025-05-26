document.addEventListener('DOMContentLoaded', function() {
    
    const inputsToValidate = [
        { element: document.getElementById('nome'), errorSpan: null, message: 'O nome é obrigatório.' },
        { element: document.getElementById('rg'), errorSpan: document.getElementById('rg-erro'), message: 'Formato de RG inválido (ex: XX.XXX.XXX-Y ou XX.XXX.XXX-YY).' },
        { element: document.getElementById('telefone'), errorSpan: document.getElementById('telefone-erro'), message: 'Formato de telefone inválido (ex: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX).' },
        { element: document.getElementById('e-mail'), errorSpan: document.getElementById('email-erro'), message: 'Formato de e-mail inválido (ex: seuemail@dominio.com).' },
        { element: document.getElementById('estado'), errorSpan: null, message: 'O estado é obrigatório.' },
        { element: document.getElementById('cidade'), errorSpan: null, message: 'A cidade é obrigatória.' },
        { element: document.getElementById('bairro'), errorSpan: null, message: 'O bairro é obrigatório.' },
        { element: document.getElementById('rua'), errorSpan: null, message: 'A rua é obrigatória.' },
        { element: document.getElementById('cep'), errorSpan: document.getElementById('cep-erro'), message: 'Formato de CEP inválido (ex: XXXXX-XXX).' }
    ];

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
                if (fieldConfig && inputElement.validity.patternMismatch) {
                    errorMessage = fieldConfig.message;
                } else if (fieldConfig && inputElement.validity.valueMissing) {
                     errorMessage = fieldConfig.message;
                }

                errorSpanElement.textContent = errorMessage;
            }
            inputElement.classList.add('invalid');
            return false;
        }
    }

    window.atualizarCliente = async function() {
        let allFieldsValid = true;

        inputsToValidate.forEach(field => {
            if (field.element && !validateField(field.element, field.errorSpan)) {
                allFieldsValid = false;
            }
        });

        if (!allFieldsValid) {
            alert('Por favor, corrija os erros nos campos antes de salvar.');
            return;
        }

        const idCliente = document.getElementById("id").value;

        const dados = {
            nome: document.getElementById("nome").value,
            rg: document.getElementById("rg").value,
            cpf: document.getElementById("cpf").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("e-mail").value, 
            estado: document.getElementById("estado").value,
            cidade: document.getElementById("cidade").value,
            bairro: document.getElementById("bairro").value,
            rua: document.getElementById("rua").value,
            cep: document.getElementById("cep").value
        };

        try {
            const response = await fetch(`http://localhost:8080/cliente/editarcliente/${idCliente}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert("Cliente atualizado com sucesso!");
                window.location.href = "/tabelaclientes";
            } else {
                
                const errorData = await response.json(); 
                let errorMessage = "Erro ao atualizar cliente. Código: " + response.status;
                if (errorData && errorData.message) { 
                    errorMessage += "\nDetalhes: " + errorData.message;
                } else if (errorData && errorData.errors && errorData.errors.length > 0) { 
                    errorMessage += "\nDetalhes: " + errorData.errors.map(err => err.defaultMessage || err.message).join(', ');
                }
                alert(errorMessage);
            }
        } catch (error) {
            alert("Erro na requisição: " + error);
        }
    };
});



