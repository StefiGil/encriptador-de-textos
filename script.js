// Función de modo claro a modo oscuro
const themeToggle = document.getElementById('theme-toggle');
const themeStyle = document.getElementById('theme-style');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    if (themeStyle.getAttribute('href') === 'principal-page.css') {
        themeStyle.setAttribute('href', 'principal-page-dark-mode.css');
        themeIcon.setAttribute('src', 'img/light-mode.png');
    } else {
        themeStyle.setAttribute('href', 'principal-page.css');
        themeIcon.setAttribute('src', 'img/dark-mode-toggle.png');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Función para validar la entrada de solo minusculas y espacios
    function validateInput(inputText) {
        const regex = /^[a-z\s]*$/; 
        return regex.test(inputText);
    }

    // Función para mostrar el mensaje de error de ingreso de caracteres especiales y mayusculas
    function showErrorMessage(show) {
        let errorMessage = document.getElementById("error-message");
        errorMessage.style.display = show ? "block" : "none";
    }

    // Función para limpiar caracteres no permitidos
    function cleanInput(inputText) {
        return inputText.replace(/[^a-z\s]/g, ''); 
    }
    
    // Eventos para el textarea y los botones
    document.getElementById("inputMessage").addEventListener("input", function() {
        let inputText = this.value;
        if (!validateInput(inputText)) {
            this.value = cleanInput(inputText);
            showErrorMessage(true); 
        } else {
            showErrorMessage(false); 
        }
    });

    // Cambia el color del texto de input text de color gris a negro
    const textarea = document.querySelector('.textarea-input');

    // Percibe el evento 'input', que se activa cada vez que el usuario escribe algo
    textarea.addEventListener('input', function() {
        textarea.style.color = 'var(--seventh-color)'; 
    });

    // Función para cambiar el color de fondo de outputMessage a blanco
    function changeOutputBackgroundColor() {
        let outputMessage = document.getElementById("outputMessage");
        outputMessage.style.backgroundColor = "var(--eighth-color)";
        outputMessage.style.border = " 0.3rem solid var(--first-color)";
        outputMessage.style.color = "var(--seventh-color)";
    }

    //Eventos que deben suceder al presionar el boton de "encriptar o desencriptar"
    document.getElementById("encryptBtn").addEventListener("click", function() {
        let inputText = document.getElementById("inputMessage").value;
        if (validateInput(inputText)) {
            let encryptedText = encrypt(inputText);
            document.getElementById("outputMessage").value = encryptedText;
            showErrorMessage(false); // Oculta el mensaje de error
            showCopyButton(); // Muestra el botón de copiar
            changeOutputBackgroundColor(); // Cambia el color de fondo a blanco
        } else {
            showErrorMessage(true); // Muestra el mensaje de error
        }
    });

    document.getElementById("decryptBtn").addEventListener("click", function() {
        let inputText = document.getElementById("inputMessage").value;
        if (validateInput(inputText)) {
            let decryptedText = decrypt(inputText);
            document.getElementById("outputMessage").value = decryptedText;
            showErrorMessage(false);
            showCopyButton(); 
            changeOutputBackgroundColor(); 
        } else {
            showErrorMessage(true); 
        }
    });

    // Funciones de encriptar y desencriptar
    function encrypt(text) {
        return text
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
    }

    function decrypt(text) {
        return text
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");
    } 

    // Función para manejar el clic en el botón de copiar
    document.getElementById("copyBtn").addEventListener("click", function() {
        let outputMessage = document.getElementById("outputMessage").value;
        navigator.clipboard.writeText(outputMessage).then(function() {
            let copyBtn = document.getElementById("copyBtn");
            copyBtn.textContent = "¡Copiado!"; // Cambia el texto del botón a "¡Copiado!"

            //Cambia el texto de vuelta a "Copiar" después de unos segundos
            setTimeout(() => {
                copyBtn.textContent = "Copiar";
            }, 2000); // Cambia el texto de vuelta después de 2 segundos
        }).catch(function(error) {
            console.error("Error al copiar al portapapeles: ", error);
        });
    });

    // Función para mostrar el botón de copiar luego de presionar "encriptar o desencriptar"
    function showCopyButton() {
        let copyBtn = document.getElementById("copyBtn");
        copyBtn.style.display = "block";
    }
});
