function trocarFotoPorCor(select) {
            const camadaImagem = document.getElementById('produto-imagem');
            const opcaoSelecionada = select.options[select.selectedIndex];
            const novaFoto = opcaoSelecionada.getAttribute('data-foto');

            if (novaFoto) {
                // 1. Atualiza o valor que vai para o carrinho
                camadaImagem.value = novaFoto;

                // 2. (Opcional) Se você quiser mudar a foto principal que o cliente vê na página:
                const fotoVitrine = document.querySelector('.foto-principal-produto'); // Use o ID ou Classe da sua imagem de destaque
                if (fotoVitrine) {
                    fotoVitrine.src = novaFoto;
                }
            }
        }