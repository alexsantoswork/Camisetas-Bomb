//BOTÃO 01
function validarBtnUm() {
    const nameInput = document.getElementById('names');
    const inputValueName = nameInput.value.trim();

    if (inputValueName === "") {
        nameInput.style.borderColor = 'red';
    }
    
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            nameInput.style.borderColor = 'green';
        }
    })

    function validarRadioSelecionado(cor) {
        const radios = document.getElementsByName('cor')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('cor')) {
            event.preventDefault();
        } 
    })

    function validarRadioSelecionado(tamanho) {
        const radios = document.getElementsByName('tamanho')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('tamanho')) {
            event.preventDefault();
        } 
    })
    
    if (validarRadioSelecionado('tamanho', 'cor') && nameInput.value.trim() !== '') {
        window.open('https://pay.sumup.com/b2c/QW698QFV', '_blank');
    }
}

//BOTÃO 02
function validarBtnDois() {
    const nameInput = document.getElementById('names');
    const inputValueName = nameInput.value.trim();

    if (inputValueName === "") {
        nameInput.style.borderColor = 'red';
    }
    
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            nameInput.style.borderColor = 'green';
        }
    })

    function validarRadioSelecionado(cor) {
        const radios = document.getElementsByName('cor')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('cor')) {
            event.preventDefault();
        } 
    })

    function validarRadioSelecionado(tamanho) {
        const radios = document.getElementsByName('tamanho')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('tamanho')) {
            event.preventDefault();
        } 
    })
    
    if (validarRadioSelecionado('tamanho', 'cor')) {
        window.open('http://127.0.0.1:5500/02.html', '_blank');
    }
}

//BOTÃO 03
function validarBtnTres() {
    const nameInput = document.getElementById('names');
    const inputValueName = nameInput.value.trim();

    if (inputValueName === "") {
        nameInput.style.borderColor = 'red';
    }
    
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            nameInput.style.borderColor = 'green';
        }
    })

    function validarRadioSelecionado(cor) {
        const radios = document.getElementsByName('cor')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('cor')) {
            event.preventDefault();
        } 
    })

    function validarRadioSelecionado(tamanho) {
        const radios = document.getElementsByName('tamanho')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('tamanho')) {
            event.preventDefault();
        } 
    })
    
    if (validarRadioSelecionado('tamanho', 'cor')) {
        window.open('http://127.0.0.1:5500/03.html', '_blank');
    }
}

//BOTÃO 04
function validarBtnQuatro() {
    const nameInput = document.getElementById('names');
    const inputValueName = nameInput.value.trim();

    if (inputValueName === "") {
        nameInput.style.borderColor = 'red';
    }
    
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            nameInput.style.borderColor = 'green';
        }
    })

    function validarRadioSelecionado(cor) {
        const radios = document.getElementsByName('cor')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('cor')) {
            event.preventDefault();
        } 
    })

    function validarRadioSelecionado(tamanho) {
        const radios = document.getElementsByName('tamanho')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('tamanho')) {
            event.preventDefault();
        } 
    })
    
    if (validarRadioSelecionado('tamanho', 'cor')) {
        window.open('http://127.0.0.1:5500/04.html', '_blank');
    }
}

//BOTÃO 05
function validarBtnCinco() {
    const nameInput = document.getElementById('names');
    const inputValueName = nameInput.value.trim();

    if (inputValueName === "") {
        nameInput.style.borderColor = 'red';
    }
    
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            nameInput.style.borderColor = 'green';
        }
    })

    function validarRadioSelecionado(cor) {
        const radios = document.getElementsByName('cor')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('cor')) {
            event.preventDefault();
        } 
    })

    function validarRadioSelecionado(tamanho) {
        const radios = document.getElementsByName('tamanho')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('tamanho')) {
            event.preventDefault();
        } 
    })
    
    if (validarRadioSelecionado('tamanho', 'cor')) {
        window.open('http://127.0.0.1:5500/05.html', '_blank');
    }
}

//BOTÃO 06
function validarBtnSeis() {
    const nameInput = document.getElementById('names');
    const inputValueName = nameInput.value.trim();

    if (inputValueName === "") {
        nameInput.style.borderColor = 'red';
    }
    
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim() !== '') {
            nameInput.style.borderColor = 'green';
        }
    })

    function validarRadioSelecionado(cor) {
        const radios = document.getElementsByName('cor')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('cor')) {
            event.preventDefault();
        } 
    })

    function validarRadioSelecionado(tamanho) {
        const radios = document.getElementsByName('tamanho')
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    document.getElementById('form').addEventListener('submit', function (event) {
        if (!validarRadioSelecionado('tamanho')) {
            event.preventDefault();
        } 
    })
    
    if (validarRadioSelecionado('tamanho', 'cor')) {
        window.open('http://127.0.0.1:5500/06.html', '_blank');
    }
}