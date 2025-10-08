 JavaScript para o Gerenciador de Câmeras de Segurança
// Este script lida com a interatividade dos botões e a exibição de mensagens.

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona os elementos necessários
    const controlButtons = document.querySelectorAll('.control-button');
    const cameraFeed = document.getElementById('camera-feed');
    const container = document.querySelector('.container'); // Para anexar a mensagem

    // 2. Adiciona um ouvinte de evento de clique a todos os botões de controle
    controlButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Obtém os dados da câmera e da ação dos atributos "data-"
            const action = event.target.dataset.action;
            const camera = event.target.dataset.camera;
            
            handleCameraAction(camera, action);
        });
    });

    /**
     * Lida com as ações da câmera e exibe mensagens na tela, simulando a comunicação.
     * @param {string} camera O número da câmera.
     * @param {string} action A ação a ser realizada ('toggle', 'record', 'stream').
     */
    function handleCameraAction(camera, action) {
        let message = '';
        
        switch (action) {
            case 'toggle':
                message = `Câmera ${camera} foi ligada/desligada.`;
                break;
            case 'record':
                message = `Gravação iniciada na Câmera ${camera}.`;
                break;
            case 'stream':
                message = `Iniciando transmissão da Câmera ${camera}.`;
                // Atualiza a área de visualização do vídeo
                cameraFeed.innerHTML = `<span class="text-white">Transmissão da Câmera ${camera} (AO VIVO)</span>`;
                break;
            default:
                message = `Ação desconhecida para a Câmera ${camera}.`;
                break;
        }

        // Exibe a mensagem temporária na tela
        showTemporaryMessage(message);
    }

    /**
     * Cria e exibe um pop-up de mensagem temporária.
     * @param {string} message A mensagem a ser exibida.
     */
    function showTemporaryMessage(message) {
        // Verifica se já existe uma mensagem, e remove se existir para evitar empilhamento
        const existingMessage = document.querySelector('.message-element');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        
        // Classes de estilo (ajustadas para o Tailwind/CSS do seu projeto)
        messageElement.className = 'message-element fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500 ease-in-out opacity-0 z-50';
        
        // Adiciona o elemento ao corpo da página (ou ao contêiner principal)
        document.body.appendChild(messageElement);

        // Força a exibição para que a transição de opacidade funcione
        setTimeout(() => {
            messageElement.style.opacity = '1'; 
        }, 10); 

        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            messageElement.style.opacity = '0'; 
            messageElement.addEventListener('transitionend', () => {
                messageElement.remove();
            }, { once: true }); 
        }, 3000); 
    }
});
