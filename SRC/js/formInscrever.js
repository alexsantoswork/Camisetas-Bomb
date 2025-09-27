const SCRIPT_INSCRICAO_URL = 'https://script.google.com/macros/s/AKfycbzKJwCdwqaFmEgI2GRdpycmsCpwnseEnAML2KdcVG5uXkWg9aNeAoSPVevfde7XforfHg/exec'; 

const formInscrito = document.getElementById('form-inscrito');
const btnInscrever = formInscrito.querySelector('button'); 

// Captura os novos elementos HTML:
const emailInput = formInscrito.querySelector('[name="e-mail"]');
const errorMessage = document.getElementById('email-error-message');


// Função de Validação de E-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

formInscrito.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    const emailValue = emailInput.value.trim();

    // 1. Oculta qualquer mensagem de erro anterior
    errorMessage.style.display = 'none';

    // 2. Executa a Validação
    if (!isValidEmail(emailValue)) {
        // Exibe a mensagem de erro no local definido
        errorMessage.style.display = 'block'; 
        emailInput.focus();
        return; // Interrompe o processo se o e-mail for inválido
    }

    // Se o e-mail for válido, prossegue com o envio:
    btnInscrever.disabled = true;
    btnInscrever.textContent = 'Processando...';

    const formData = new FormData(formInscrito);

    fetch(SCRIPT_INSCRICAO_URL, {
        method: 'POST',
        body: formData 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro de rede ou Apps Script: Status ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.result === "success") {
            // Sucesso: feedback visual, limpeza e desativação
            btnInscrever.textContent = '✅ Inscrito!';
            formInscrito.reset(); 
            btnInscrever.disabled = true; 
        } else {
            // FALHA no Apps Script: Feedback de erro mais explícito
            errorMessage.textContent = `⚠️ Falha: ${data.message}`;
            errorMessage.style.display = 'block'; 
        }
    })
    .catch(error => {
        // Erro de rede ou erro na comunicação
        console.error('Erro geral de envio:', error);
        errorMessage.textContent = '❌ Erro de conexão. Tente novamente.';
        errorMessage.style.display = 'block';
    })
    .finally(() => {
        // Reativa o botão e restaura o texto SOMENTE se não houve sucesso (✅)
        if (!btnInscrever.textContent.includes('✅')) {
             btnInscrever.disabled = false;
             btnInscrever.textContent = 'Inscrever';
        }
    });
});