document.addEventListener('DOMContentLoaded', function() {
    // Scene Transition Elements
    const forwardBtn = document.getElementById('forward');
    const backBtn = document.getElementById('back');
    const antaresSet = document.querySelector('.antares');
    const heartTreeSet = document.querySelector('.heart_tree');
    const body = document.body;
    const chatbox = document.querySelector('.chatbox');

    // Create chat text element
    const chatText = document.createElement('div');
    chatText.className = 'chat-text';
    chatbox.appendChild(chatText);

    // Typewriter Effect Function
    function typeWriter(textElement, text, speed = 30) {
        let i = 0;
        textElement.textContent = '';
        textElement.classList.add('typing', 'visible');
        
        function type() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                textElement.classList.remove('typing');
            }
        }
        type();
    }

    // Forward Button - Transition to Heart Tree
    forwardBtn.addEventListener('click', function() {
        antaresSet.style.opacity = '0';
        setTimeout(() => {
            antaresSet.style.display = 'none';
            body.style.backgroundImage = "url('img/heart_tree.PNG')";
            heartTreeSet.style.display = 'block';
            heartTreeSet.style.opacity = '0';
            setTimeout(() => {
                heartTreeSet.style.opacity = '1';
            }, 50);
            forwardBtn.style.zIndex = '1000';
            backBtn.style.zIndex = '1000';
        }, 500);
    });

    // Back Button - Transition to Antares
    backBtn.addEventListener('click', function() {
        heartTreeSet.style.opacity = '0';
        setTimeout(() => {
            heartTreeSet.style.display = 'none';
            body.style.backgroundImage = "url('img/antares.PNG')";
            antaresSet.style.display = 'block';
            antaresSet.style.opacity = '0';
            setTimeout(() => {
                antaresSet.style.opacity = '1';
            }, 50);
        }, 500);
    });

    // Button Z-Index Management
    document.querySelectorAll('.image-button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.zIndex = '100';
        });
        button.addEventListener('mouseup', function() {
            if (this.closest('.antares')) {
                this.style.zIndex = this.id === 'pencil_case' ? '5' : '1';
            } else {
                this.style.zIndex = this.id === 'uke' ? '3' : '2';
            }
        });
    });

    // Button Actions with Modals and Chat Text
    const buttonActions = [
        { 
            id: 'pencil_case',
            modal: 'pencilCaseModal',
            text: "You found a sharp pencil! Be careful with this."
        },
        { 
            id: 'locker',
            modal: 'lockerModal',
            text: "The locker contains old notebooks and memories."
        },
        { 
            id: 'desk',
            modal: 'deskModal',
            text: "The desk has carved initials and doodles."
        },
        { 
            id: 'backpack',
            modal: 'backpackModal',
            text: "The backpack is full of snacks and stationery."
        },
        { 
            id: 'uke',
            modal: 'ukeModal',
            text: "The backpack is full of snacks and stationery."
        },
        { 
            id: 'dodie',
            modal: 'dodieModal',
            text: "The backpack is full of snacks and stationery."
        },
        { 
            id: 'boba',
            modal: 'bobaModal',
            text: "The backpack is full of snacks and stationery."
        },
        { 
            id: 'gucci',
            modal: '420gucciModal',
            text: "The backpack is full of snacks and stationery."
        }
    ];

    // Set up button click handlers
    buttonActions.forEach(button => {
        const btnElement = document.getElementById(button.id);
        const modalElement = document.getElementById(button.modal);
        
        if (btnElement && modalElement) {
            btnElement.addEventListener('click', function(e) {
                e.stopPropagation();
                modalElement.classList.add('active');
                typeWriter(chatText, button.text);
            });
        }
    });
    
    // Close modal when clicking anywhere
    document.addEventListener('click', function(e) {
        // Only close if we're not clicking a modal trigger button
        if (!e.target.closest('.image-button[data-modal], .image-button[id]')) {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
            });
            // Hide chat text when modal closes
            chatText.classList.remove('visible');
        }
        });
});