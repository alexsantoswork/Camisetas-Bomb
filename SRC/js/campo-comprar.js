// Aguarda o carregamento completo do conteúdo da página
        document.addEventListener('DOMContentLoaded', function() {
            
            // Seleciona os elementos do formulário
            const form = document.getElementById('meuFormulario');
            const nameInput = document.getElementById('names');
            const tamanhoRadios = document.querySelectorAll('input[name="tamanho"]');
            
            // Seleciona os locais onde as mensagens de erro serão exibidas
            const nameError = document.getElementById('names-msg');
            const tamanhoError = document.getElementById('campo2-msg');

            // Adiciona um "ouvinte" para o evento de submissão do formulário
            form.addEventListener('submit', function(event) {
                // Previne o envio padrão do formulário para que a validação possa ser feita
                event.preventDefault();

                let isFormValid = true;

                // --- 1. Validação do campo Nome ---
                // .trim() remove espaços em branco do início e do fim
                if (nameInput.value.trim() === '') {
                    nameError.textContent = 'Por favor, preencha o seu nome.';
                    isFormValid = false;
                } else {
                    nameError.textContent = ''; // Limpa a mensagem de erro se o campo for válido
                }

                // --- 2. Validação dos botões de Rádio (Tamanho) ---
                let isTamanhoSelected = false;
                tamanhoRadios.forEach(function(radio) {
                    if (radio.checked) {
                        isTamanhoSelected = true;
                    }
                });

                if (!isTamanhoSelected) {
                    tamanhoError.textContent = 'Por favor, selecione um tamanho.';
                    isFormValid = false;
                } else {
                    tamanhoError.textContent = ''; // Limpa a mensagem de erro se um tamanho foi selecionado
                }

                // --- 3. Submissão do Formulário ---
                // Se todas as validações passaram, envia o formulário
                if (isFormValid) {
                    form.submit();
                }
            });
        });