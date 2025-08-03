document.addEventListener('DOMContentLoaded', function() {
    const meuFormulario = document.getElementById('meuFormulario');
    const validarAbrirBtn = document.getElementById('validarAbrirBtn');

    // Adiciona um listener para o evento 'submit' do formulário
    meuFormulario.addEventListener('submit', function(event) {
        // Previne o envio padrão do formulário, vamos controlá-lo com JavaScript
        event.preventDefault();

        let todosCamposValidos = true;

        // Limpa todas as mensagens de validação anteriores
        document.querySelectorAll('.validation-message').forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('success');
        });


        // --- Validação Campo 1: Escolher um número par ---
        const campo1Radios = document.getElementsByName('cor');
        const campo1Msg = document.getElementById('campo1-msg');
        let campo1Selecionado = false;
        let campo1Valor = '';

        for (let i = 0; i < campo1Radios.length; i++) {
            if (campo1Radios[i].checked) {
                campo1Selecionado = true;
                campo1Valor = parseInt(campo1Radios[i].value);
                break;
            }
        }

        if (!campo1Selecionado) {
            campo1Msg.textContent = 'Escolha uma cor.';
            campo1Msg.classList.remove('success');
            campo1Msg.classList.add('error');
            todosCamposValidos = false;
        } 
        // else if (campo1Valor % 2 !== 0) {
        //     campo1Msg.textContent = 'Por favor, selecione um número par.';
        //     todosCamposValidos = false;
        // }
         else {
            campo1Msg.textContent = 'Cor selecionada';
            campo1Msg.classList.remove('error');
            campo1Msg.classList.add('success');
        }

        // --- Validação Campo 2: Escolher uma cor primária (vermelho, azul ou amarelo) ---
        const campo2Radios = document.getElementsByName('tamanho');
        const campo2Msg = document.getElementById('campo2-msg');
        let campo2Selecionado = false;
        let campo2Valor = '';
        const coresPrimarias = ['P', 'M', 'G', 'GG'];

        for (let i = 0; i < campo2Radios.length; i++) {
            if (campo2Radios[i].checked) {
                campo2Selecionado = true;
                campo2Valor = campo2Radios[i].value;
                break;
            }
        }

        if (!campo2Selecionado) {
            campo2Msg.textContent = 'Escolha um tamanho.';
            campo2Msg.classList.remove('success');
            campo2Msg.classList.add('error');
            todosCamposValidos = false;
        } else if (!coresPrimarias.includes(campo2Valor)) {
            campo2Msg.textContent = 'Por favor, selecione uma cor primária (vermelho, azul ou amarelo).';
            todosCamposValidos = false;
        } else {
            campo2Msg.textContent = 'Tamanho Selecionado';
            campo2Msg.classList.remove('error');
            campo2Msg.classList.add('success');
        }

        // --- Validação Campo 3: Selecionar qualquer link ---
        const campo3Radios = document.getElementsByName('quantidade');
        const campo3Msg = document.getElementById('campo3-msg');
        let campo3Selecionado = false;
        let linkParaAbrir = '';

        for (let i = 0; i < campo3Radios.length; i++) {
            if (campo3Radios[i].checked) {
                campo3Selecionado = true;
                linkParaAbrir = campo3Radios[i].value;
                break;
            }
        }

        if (!campo3Selecionado) {
            campo3Msg.textContent = 'Escolha a quantidade.';
            campo3Msg.classList.remove('success');
            campo3Msg.classList.add('error');
            todosCamposValidos = false;
        } else {
            campo3Msg.textContent = 'Quantidade selecionada';
            campo3Msg.classList.remove('error');
            campo3Msg.classList.add('success');
        }

        // --- Ação Final Baseada na Validação ---
        const globalMsg = document.getElementById('global-msg');
        if (todosCamposValidos) {
            globalMsg.textContent = 'Todos os campos estão válidos! Enviando dados e abrindo a página...';
            globalMsg.classList.add('success');
            globalMsg.classList.remove('error');

            // Envia o formulário para o StaticForms
            // Nota: o StaticForms fará o redirecionamento após o envio
            // A abertura da nova aba para o link deve ser feita ANTES do submit,
            // ou você pode usar o "redirectTo" do StaticForms para uma página de sucesso
            // onde o link é aberto, mas isso é mais complexo.
            // Para manter a funcionalidade original (abrir tab), faremos assim:

            window.open(linkParaAbrir, '_blank'); // Abre a nova aba

            // Envia o formulário APÓS abrir a nova aba
            // Você pode querer um pequeno delay aqui, mas geralmente não é necessário.
            meuFormulario.submit();

        } else {
            globalMsg.textContent = 'Por favor, selecione os campos abaixo.';
            globalMsg.classList.add('error');
            globalMsg.classList.remove('success'); // Garante que não tenha a cor de sucesso
        }
    });
});




// //BOTÃO 01
// function validarBtnUm() {
//     const nameInput = document.getElementById('names');
//     const inputValueName = nameInput.value.trim();

//     if (inputValueName === "") {
//         nameInput.style.borderColor = 'red';
//     }
    
//     nameInput.addEventListener('input', function () {
//         if (nameInput.value.trim() !== '') {
//             nameInput.style.borderColor = 'green';
//         }
//     })

//     function validarRadioSelecionado(cor) {
//         const radios = document.getElementsByName('cor')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('cor')) {
//             event.preventDefault();
//         } 
//     })

//     function validarRadioSelecionado(tamanho) {
//         const radios = document.getElementsByName('tamanho')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('tamanho')) {
//             event.preventDefault();
//         } 
//     })
    
//     if (validarRadioSelecionado('tamanho', 'cor') && nameInput.value.trim() !== '') {
//         window.open('https://pay.sumup.com/b2c/QW698QFV', '_blank');
//     }
// }

// //BOTÃO 02
// function validarBtnDois() {
//     const nameInput = document.getElementById('names');
//     const inputValueName = nameInput.value.trim();

//     if (inputValueName === "") {
//         nameInput.style.borderColor = 'red';
//     }
    
//     nameInput.addEventListener('input', function () {
//         if (nameInput.value.trim() !== '') {
//             nameInput.style.borderColor = 'green';
//         }
//     })

//     function validarRadioSelecionado(cor) {
//         const radios = document.getElementsByName('cor')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('cor')) {
//             event.preventDefault();
//         } 
//     })

//     function validarRadioSelecionado(tamanho) {
//         const radios = document.getElementsByName('tamanho')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('tamanho')) {
//             event.preventDefault();
//         } 
//     })
    
//     if (validarRadioSelecionado('tamanho', 'cor')) {
//         window.open('http://127.0.0.1:5500/02.html', '_blank');
//     }
// }

// //BOTÃO 03
// function validarBtnTres() {
//     const nameInput = document.getElementById('names');
//     const inputValueName = nameInput.value.trim();

//     if (inputValueName === "") {
//         nameInput.style.borderColor = 'red';
//     }
    
//     nameInput.addEventListener('input', function () {
//         if (nameInput.value.trim() !== '') {
//             nameInput.style.borderColor = 'green';
//         }
//     })

//     function validarRadioSelecionado(cor) {
//         const radios = document.getElementsByName('cor')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('cor')) {
//             event.preventDefault();
//         } 
//     })

//     function validarRadioSelecionado(tamanho) {
//         const radios = document.getElementsByName('tamanho')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('tamanho')) {
//             event.preventDefault();
//         } 
//     })
    
//     if (validarRadioSelecionado('tamanho', 'cor')) {
//         window.open('http://127.0.0.1:5500/03.html', '_blank');
//     }
// }

// //BOTÃO 04
// function validarBtnQuatro() {
//     const nameInput = document.getElementById('names');
//     const inputValueName = nameInput.value.trim();

//     if (inputValueName === "") {
//         nameInput.style.borderColor = 'red';
//     }
    
//     nameInput.addEventListener('input', function () {
//         if (nameInput.value.trim() !== '') {
//             nameInput.style.borderColor = 'green';
//         }
//     })

//     function validarRadioSelecionado(cor) {
//         const radios = document.getElementsByName('cor')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('cor')) {
//             event.preventDefault();
//         } 
//     })

//     function validarRadioSelecionado(tamanho) {
//         const radios = document.getElementsByName('tamanho')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('tamanho')) {
//             event.preventDefault();
//         } 
//     })
    
//     if (validarRadioSelecionado('tamanho', 'cor')) {
//         window.open('http://127.0.0.1:5500/04.html', '_blank');
//     }
// }

// //BOTÃO 05
// function validarBtnCinco() {
//     const nameInput = document.getElementById('names');
//     const inputValueName = nameInput.value.trim();

//     if (inputValueName === "") {
//         nameInput.style.borderColor = 'red';
//     }
    
//     nameInput.addEventListener('input', function () {
//         if (nameInput.value.trim() !== '') {
//             nameInput.style.borderColor = 'green';
//         }
//     })

//     function validarRadioSelecionado(cor) {
//         const radios = document.getElementsByName('cor')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('cor')) {
//             event.preventDefault();
//         } 
//     })

//     function validarRadioSelecionado(tamanho) {
//         const radios = document.getElementsByName('tamanho')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('tamanho')) {
//             event.preventDefault();
//         } 
//     })
    
//     if (validarRadioSelecionado('tamanho', 'cor')) {
//         window.open('http://127.0.0.1:5500/05.html', '_blank');
//     }
// }

// //BOTÃO 06
// function validarBtnSeis() {
//     const nameInput = document.getElementById('names');
//     const inputValueName = nameInput.value.trim();

//     if (inputValueName === "") {
//         nameInput.style.borderColor = 'red';
//     }
    
//     nameInput.addEventListener('input', function () {
//         if (nameInput.value.trim() !== '') {
//             nameInput.style.borderColor = 'green';
//         }
//     })

//     function validarRadioSelecionado(cor) {
//         const radios = document.getElementsByName('cor')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('cor')) {
//             event.preventDefault();
//         } 
//     })

//     function validarRadioSelecionado(tamanho) {
//         const radios = document.getElementsByName('tamanho')
//         for (let i = 0; i < radios.length; i++) {
//             if (radios[i].checked) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     document.getElementById('form').addEventListener('submit', function (event) {
//         if (!validarRadioSelecionado('tamanho')) {
//             event.preventDefault();
//         } 
//     })
    
//     if (validarRadioSelecionado('tamanho', 'cor')) {
//         window.open('http://127.0.0.1:5500/06.html', '_blank');
//     }
// }