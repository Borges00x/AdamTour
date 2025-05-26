document.addEventListener('DOMContentLoaded', function() {

    const comprarButton = document.querySelector('.comprar');
    const idInput = document.querySelector('.passagem .id');

    if (comprarButton && idInput) {
        comprarButton.addEventListener('click', function(event) {
            event.preventDefault();

            const passagemId = idInput.value.trim();

            if (passagemId === '') {
                alert('Por favor, digite o ID da passagem que deseja comprar.');
                idInput.focus();
            } else {
                window.location.href = '/cadastro';
            }
        });
    }

    const inputPartida = document.getElementById('inputPartida');
    const inputDestino = document.getElementById('inputDestino');
    const tabelaBody = document.getElementById('tabelaPassagensBody');
    const mensagemNenhumaPassagem = document.getElementById('mensagemNenhumaPassagem');

    if (inputPartida && inputDestino && tabelaBody && mensagemNenhumaPassagem) {
        
        const linhasPassagem = Array.from(tabelaBody.querySelectorAll('tr')).slice(1);

        function aplicarFiltro() {
            const termoPartida = inputPartida.value.toLowerCase();
            const termoDestino = inputDestino.value.toLowerCase();
            let passagensVisiveis = 0;

            linhasPassagem.forEach(linha => {
                const celulaPartida = linha.cells[2].textContent.toLowerCase();
                const celulaDestino = linha.cells[3].textContent.toLowerCase();

                const mostrarLinha = (termoPartida === '' || celulaPartida.includes(termoPartida)) &&
                                     (termoDestino === '' || celulaDestino.includes(termoDestino));

                linha.style.display = mostrarLinha ? '' : 'none';

                if (mostrarLinha) {
                    passagensVisiveis++;
                }
            });

            if (passagensVisiveis === 0) {
                mensagemNenhumaPassagem.style.display = 'block';
            } else {
                mensagemNenhumaPassagem.style.display = 'none';
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const origemParam = urlParams.get('origem');
        const destinoParam = urlParams.get('destino');

        if (origemParam) {
            inputPartida.value = origemParam;
        }
        if (destinoParam) {
            inputDestino.value = destinoParam;
        }

        inputPartida.addEventListener('input', aplicarFiltro);
        inputDestino.addEventListener('input', aplicarFiltro);

        aplicarFiltro();

    } else {
        console.warn("Um ou mais elementos para o filtro de passagens (inputPartida, inputDestino, tabelaPassagensBody ou mensagemNenhumaPassagem) não foram encontrados. O filtro dinâmico e a mensagem podem não funcionar corretamente.");
    }
});