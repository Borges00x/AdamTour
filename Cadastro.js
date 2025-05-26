function exibirErro(campoId, mensagem) {
    const erroSpan = document.getElementById(campoId + "-erro");
    if (erroSpan) {
        erroSpan.textContent = mensagem;
    } else {
        const campo = document.getElementById(campoId);
        if (campo) {
            const span = document.createElement('span');
            span.id = campoId + "-erro";
            span.className = "erro-mensagem";
            span.textContent = mensagem;
            campo.parentNode.insertBefore(span, campo.nextSibling);
        }
    }
}

function limparErro(campoId) {
    const erroSpan = document.getElementById(campoId + "-erro");
    if (erroSpan) {
        erroSpan.textContent = "";
    }
}

function validarTelefone() {
    const telefoneInput = document.getElementById("telefone");
    const telefone = telefoneInput.value.replace(/\D/g, '');
    if (!/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/.test(telefoneInput.value)) {
        exibirErro("telefone", "Formato de telefone inválido. Use (XX) XXXXX-XXXX.");
        return false;
    }
    limparErro("telefone");
    return true;
}

function validarCPF() {
    const cpfInput = document.getElementById("cpf");
    const cpf = cpfInput.value.replace(/\D/g, '');

    if (!/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(cpfInput.value)) {
        exibirErro("cpf", "Formato de CPF inválido. Use XXX.XXX.XXX-YY.");
        return false;
    }

    if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') {
        exibirErro("cpf", "CPF inválido.");
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        exibirErro("cpf", "CPF inválido.");
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        exibirErro("cpf", "CPF inválido.");
        return false;
    }

    limparErro("cpf");
    return true;
}

function validarRG() {
    const rgInput = document.getElementById("rg");
    const rg = rgInput.value.replace(/\D/g, '');
    if (!/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9]{1}$/.test(rgInput.value)) {
        exibirErro("rg", "Formato de RG inválido. Use XX.XXX.XXX-Y.");
        return false;
    }
    limparErro("rg");
    return true;
}

function validarEmail() {
    const emailInput = document.getElementById("e-mail");
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        exibirErro("email", "Formato de e-mail inválido. Use meuemail@exemplo.com.");
        return false;
    }
    limparErro("email");
    return true;
}

function validarCEP() {
    const cepInput = document.getElementById("cep");
    const cep = cepInput.value.replace(/\D/g, '');
    if (!/^[0-9]{5}-[0-9]{3}$/.test(cepInput.value)) {
        exibirErro("cep", "Formato de CEP inválido. Use XXXXX-YYY.");
        return false;
    }
    limparErro("cep");
    return true;
}

function validarFormulario() {
    const telefoneValido = validarTelefone();
    const cpfValido = validarCPF();
    const rgValido = validarRG();
    const emailValido = validarEmail();
    const cepValido = validarCEP();

    return telefoneValido && cpfValido && rgValido && emailValido && cepValido;
}

// Adiciona os event listeners para validar os campos no onblur
document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('blur', validarCPF);
    }

    const rgInput = document.getElementById('rg');
    if (rgInput) {
        rgInput.addEventListener('blur', validarRG);
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('blur', validarTelefone);
    }

    const emailInput = document.getElementById('e-mail');
    if (emailInput) {
        emailInput.addEventListener('blur', validarEmail);
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', validarCEP);
    }
});