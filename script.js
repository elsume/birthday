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

    // Discovery tracking (session only)
    const discoveredButtons = new Set();
    const totalButtons = 8; // pencil_case, locker, desk, backpack, uke, dodie, boba, gucci

    // Create and style discovery counter
    const discoveryCounter = document.createElement('div');
    discoveryCounter.id = 'discovery-counter';
    discoveryCounter.innerHTML = `Discovered: <span id="discovered-count">0</span>/<span id="total-buttons">${totalButtons}</span>`;
    discoveryCounter.style.position = 'fixed';
    discoveryCounter.style.top = '20px';
    discoveryCounter.style.right = '20px';
    discoveryCounter.style.background = 'rgba(0,0,0,0.7)';
    discoveryCounter.style.color = 'white';
    discoveryCounter.style.padding = '10px 15px';
    discoveryCounter.style.borderRadius = '5px';
    discoveryCounter.style.fontFamily = "'Courier New', monospace";
    discoveryCounter.style.zIndex = '2000';
    document.body.appendChild(discoveryCounter);

    // Update discovery counter display
    function updateDiscoveryCount() {
        document.getElementById('discovered-count').textContent = discoveredButtons.size;
    }

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
            text: "The ukulele plays a sweet melody when touched."
        },
        { 
            id: 'dodie',
            modal: 'dodieModal',
            text: "The notebook contains heartfelt scribbles."
        },
        { 
            id: 'boba',
            modal: 'bobaModal',
            text: "A refreshing boba tea to quench your thirst."
        },
        { 
            id: 'gucci',
            modal: '420gucciModal',
            text: "Special memories with friends."
        }
    ];

    // Set up button click handlers with discovery tracking
    buttonActions.forEach(button => {
        const btnElement = document.getElementById(button.id);
        const modalElement = document.getElementById(button.modal);
        
        if (btnElement && modalElement) {
            btnElement.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Track discovery (first click only)
                if (!discoveredButtons.has(button.id)) {
                    discoveredButtons.add(button.id);
                    updateDiscoveryCount();
                    // Visual feedback for new discovery
                    btnElement.classList.add('new-discovery');
                    setTimeout(() => {
                        btnElement.classList.remove('new-discovery');
                    }, 1000);
                }
                
                // Show modal and text
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