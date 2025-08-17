document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-inscrito');
    const emailInput = document.getElementById('names'); // ID do campo de email
    const errorMessage = document.createElement('p'); // Cria um elemento para a mensagem de erro
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.7em';
    errorMessage.style.fontFamily = 'Arial, Helvetica, sans-serif';
    errorMessage.style.textTransform = 'uppercase';
    errorMessage.style.fontStyle = 'italic';
    errorMessage.style.marginTop = '1px';
    errorMessage.style.marginBottom = '6px';
    errorMessage.textContent = 'Por favor, insira um e-mail válido.';
    errorMessage.style.display = 'none'; // Inicia oculto

    // Insere a mensagem de erro após o campo de email
    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);

    form.addEventListener('submit', function (event) {
        const email = emailInput.value;
        // Expressão regular para validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            event.preventDefault(); // Impede o envio do formulário
            errorMessage.style.display = 'block'; // Mostra a mensagem de erro
            emailInput.style.borderColor = 'red'; // Opcional: Altera a borda do input
        } else {
            errorMessage.style.display = 'none'; // Oculta a mensagem de erro se o email for válido
            emailInput.style.borderColor = ''; // Opcional: Retorna a borda ao normal
        }
    });

    // Opcional: Limpa a validação ao digitar novamente
    emailInput.addEventListener('input', function () {
        if (emailInput.value.match(emailRegex)) {
            errorMessage.style.display = 'none';
            emailInput.style.borderColor = '';
        }
    });
});
