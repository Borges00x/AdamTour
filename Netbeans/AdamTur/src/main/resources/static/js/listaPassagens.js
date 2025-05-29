document.addEventListener('DOMContentLoaded', function() {
    const comprarButton = document.querySelector('.comprar');
    const idInput = document.querySelector('.passagem .id');

    const inputPartida = document.getElementById('inputPartida');
    const inputDestino = document.getElementById('inputDestino');
    const inputDataIda = document.getElementById('inputDataIda');
    const inputDataVolta = document.getElementById('inputDataVolta');
    const limparFiltros = document.getElementById('limparFiltros');

    const tabelaBody = document.getElementById('tabelaPassagensBody');
    const mensagemNenhumaPassagem = document.getElementById('mensagemNenhumaPassagem');

    const linhasPassagem = Array.from(tabelaBody.querySelectorAll('tr')).slice(1);

    function aplicarFiltro() {
        const termoPartida = inputPartida ? inputPartida.value.toLowerCase() : '';
        const termoDestino = inputDestino ? inputDestino.value.toLowerCase() : '';
        const termoDataIda = inputDataIda ? inputDataIda.value : '';
        const termoDataVolta = inputDataVolta ? inputDataVolta.value : '';

        let passagensVisiveis = 0;

        linhasPassagem.forEach(linha => {
            const celulaPartida = linha.cells[2].textContent.toLowerCase();
            const celulaDestino = linha.cells[3].textContent.toLowerCase();
            const celulaDataIda = linha.cells[4].textContent;
            const celulaDataVolta = linha.cells[5].textContent;

            const partidaOk = termoPartida === '' || celulaPartida.includes(termoPartida);
            const destinoOk = termoDestino === '' || celulaDestino.includes(termoDestino);
            const dataIdaOk = termoDataIda === '' || celulaDataIda === termoDataIda;
            const dataVoltaOk = termoDataVolta === '' || celulaDataVolta === termoDataVolta;

            const mostrarLinha = partidaOk && destinoOk && dataIdaOk && dataVoltaOk;

            linha.style.display = mostrarLinha ? '' : 'none';

            if (mostrarLinha) {
                passagensVisiveis++;
            }
        });

        mensagemNenhumaPassagem.style.display = passagensVisiveis === 0 ? 'block' : 'none';
    }

    // ✅ Função para limpar filtros de data da URL
    function limparFiltrosDeDataNaURL() {
        const url = new URL(window.location.href);
        url.searchParams.delete('dataIda');
        url.searchParams.delete('dataVolta');
        window.location.href = url.toString();
    }

    // Adicionando botão dinamicamente para limpar data da URL
    const botaoLimparDatas = document.createElement('button');
    botaoLimparDatas.textContent = 'Limpar Filtro de Datas';
    botaoLimparDatas.style.margin = '20px';
    botaoLimparDatas.style.padding = '10px';
    botaoLimparDatas.style.fontSize = '20px';
    botaoLimparDatas.style.backgroundColor = 'red';
    botaoLimparDatas.style.color = 'white';
    botaoLimparDatas.style.cursor = 'pointer';

    const titulo = document.querySelector('h1');
if (titulo) {
    titulo.insertAdjacentElement('afterend', botaoLimparDatas);
}

    botaoLimparDatas.addEventListener('click', limparFiltrosDeDataNaURL);

    // Filtros dos campos
    if (inputPartida) inputPartida.addEventListener('input', aplicarFiltro);
    if (inputDestino) inputDestino.addEventListener('input', aplicarFiltro);
    if (inputDataIda) inputDataIda.addEventListener('input', aplicarFiltro);
    if (inputDataVolta) inputDataVolta.addEventListener('input', aplicarFiltro);

    aplicarFiltro();
});