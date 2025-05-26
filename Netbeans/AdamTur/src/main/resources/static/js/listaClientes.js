document.addEventListener("DOMContentLoaded", function () {
    const btnEditar = document.getElementById("btnEditar");
    const btnExcluir = document.getElementById("btnExcluir");
    const idClienteInput = document.getElementById("idCliente");

    if (btnEditar) {
        btnEditar.addEventListener("click", function () {
            const id = idClienteInput.value.trim();

            if (id === "") {
                alert("Por favor, informe o ID do cliente que deseja editar.");
                return;
            }
            window.location.href = `/atualizardados?id=${id}`;
        });
    }

    if (btnExcluir) {
        btnExcluir.addEventListener("click", function () {
            const id = idClienteInput.value.trim();

            if (id === "") {
                alert("Por favor, informe o ID do cliente que deseja excluir.");
                return;
            }

            const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
            if (!confirmacao) {
                return;
            }

            fetch(`http://localhost:8080/cliente/deletarcliente/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    alert("Cliente excluído com sucesso!");
                    window.location.reload();
                } else {
                    response.text().then(errorMessage => {
                        console.error("Erro do servidor:", errorMessage);
                        alert("Erro ao excluir cliente. Código: " + response.status + (errorMessage ? "\nDetalhes: " + errorMessage : ""));
                    }).catch(() => {
                        alert("Erro ao excluir cliente. Código: " + response.status);
                    });
                }
            })
            .catch(error => {
                console.error("Erro na requisição DELETE:", error);
                alert("Erro na requisição: " + error.message);
            });
        });
    }

    const inputCpf = document.getElementById('inputCpf');
    const tabelaClientesBody = document.getElementById('tabelaClientesBody');

    if (inputCpf && tabelaClientesBody) {

        const linhasCliente = Array.from(tabelaClientesBody.querySelectorAll('tr')).slice(1);

        function aplicarFiltroCpf() {
            const termoCpf = inputCpf.value.toLowerCase().replace(/[^0-9a-z]/g, '');

            linhasCliente.forEach(linha => {

                const celulaCpf = linha.cells[2].textContent.toLowerCase().replace(/[^0-9a-z]/g, '');

                const mostrarLinha = (termoCpf === '' || celulaCpf.includes(termoCpf));

                linha.style.display = mostrarLinha ? '' : 'none';
            });
        }

        inputCpf.addEventListener('input', aplicarFiltroCpf);

        aplicarFiltroCpf();
    } else {
        console.warn("Elementos de filtro (inputCpf ou tabelaClientesBody) não encontrados. O filtro dinâmico não será ativado.");
    }
});




