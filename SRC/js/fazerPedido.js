document.addEventListener('DOMContentLoaded', function() {
    const meuFormulario = document.getElementById('meuFormulario');

    meuFormulario.addEventListener('submit', function(event) {
        event.preventDefault();

        let todosCamposValidos = true;
        document.querySelectorAll('.validation-message').forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('success');
        });

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
        } else {
            campo1Msg.textContent = 'Cor selecionada';
            campo1Msg.classList.remove('error');
            campo1Msg.classList.add('success');
        }

        const campo2Radios = document.getElementsByName('tamanho');
        const campo2Msg = document.getElementById('campo2-msg');
        let campo2Selecionado = false;
        let campo2Valor = '';

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
        } else {
            campo2Msg.textContent = 'Tamanho Selecionado';
            campo2Msg.classList.remove('error');
            campo2Msg.classList.add('success');
        }

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

        const globalMsg = document.getElementById('global-msg');
        if (todosCamposValidos) {
            window.open(linkParaAbrir, '_blank'); 
            meuFormulario.submit();
        } else {
            globalMsg.textContent = 'Por favor, selecione os campos abaixo.';
            globalMsg.classList.add('error');
            globalMsg.classList.remove('success');
        }
    });
});