document.addEventListener('DOMContentLoaded', function() {
    // Name Entry System
    const nameEntry = document.getElementById('name-entry');
    const nameInput = document.getElementById('name-input');
    const submitBtn = document.getElementById('submit-name');
    const nameError = document.getElementById('name-error');
    const mainContent = document.getElementById('main-content');
    
    // Array of acceptable names (case insensitive)
    const ACCEPTABLE_NAMES = ["mwmw", "meowmeow", "meow meow"];
    
    submitBtn.addEventListener('click', checkName);
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkName();
    });

    function checkName() {
        const enteredName = nameInput.value.trim().toLowerCase();
        
        if (ACCEPTABLE_NAMES.includes(enteredName)) {
            // Correct name - grant access
            nameEntry.classList.add('hidden');
            mainContent.style.display = 'block';
            mainContent.classList.add('visible');
            initializeGame();
        } else {
            // Wrong name - show error
            nameError.textContent = "This gift isn't for you, sorry!";
            nameInput.style.borderColor = "#ff6b6b";
            setTimeout(() => {
                nameError.textContent = "";
                nameInput.style.borderColor = "#ddd";
            }, 2000);
        }
    }

    // Main Game Initialization
    function initializeGame() {
        // Scene Transition Elements
        const forwardBtn = document.getElementById('forward');
        const backBtn = document.getElementById('back');
        const body = document.body;

        // All scene containers
        const scenes = {
            antares: document.querySelector('.antares'),
            heart_tree: document.querySelector('.heart_tree'),
            screen: document.querySelector('.screen'),
            desktop: document.querySelector('.desktop'),
            journal: document.querySelector('.journal')
        };

        // Background images for each scene
        const backgrounds = {
            antares: "url('img/antares.PNG')",
            heart_tree: "url('img/heart_tree.PNG')",
            screen: "url('img/screen.png')",
            desktop: "url('img/desktop.png')",
            journal: "url('img/journal.png')"
        };

        // Scene order and tracking
        const sceneOrder = ['antares', 'heart_tree', 'screen', 'desktop', 'journal'];
        let currentSceneIndex = 0;

        // Chat System Elements
        const chatbox = document.querySelector('.chatbox');
        const resting = document.querySelector('.resting');
        const talking = document.querySelector('.talking');
        
        // Create chat text element
        const chatText = document.createElement('div');
        chatText.className = 'chat-text';
        chatbox.appendChild(chatText);

        // Discovery tracking - update totalButtons count
        const discoveredButtons = new Set();
        const totalButtons = 20; // Total interactive items across all scenes

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

        // Enhanced Typewriter Effect Function with character animation
        function typeWriter(textElement, text, speed = 30) {
            // Show talking character
            if (resting) resting.style.display = 'none';
            if (talking) talking.style.display = 'block';
            
            // Clear previous text and show element
            textElement.textContent = '';
            textElement.classList.add('visible', 'typing');
            
            let i = 0;
            function type() {
                if (i < text.length) {
                    textElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    textElement.classList.remove('typing');
                    
                    // After typing is done, return to resting after delay
                    setTimeout(() => {
                        if (resting) resting.style.display = 'block';
                        if (talking) talking.style.display = 'none';
                    }, 2000);
                }
            }
            type();
        }

        // Enhanced Scene Transition Function
        function transitionToScene(newIndex) {
            // Don't allow invalid indices
            if (newIndex < 0 || newIndex >= sceneOrder.length) {
                console.log(`Invalid scene index: ${newIndex}`);
                return;
            }

            const currentScene = sceneOrder[currentSceneIndex];
            const newScene = sceneOrder[newIndex];
            
            console.log(`Transitioning from ${currentScene} to ${newScene}`);

            // Hide current scene
            scenes[currentScene].style.opacity = '0';
            setTimeout(() => {
                scenes[currentScene].style.display = 'none';
                
                // Set new background
                body.style.backgroundImage = backgrounds[newScene];
                
                // Show new scene
                scenes[newScene].style.display = 'block';
                scenes[newScene].style.opacity = '0';
                setTimeout(() => {
                    scenes[newScene].style.opacity = '1';
                }, 50);
                
                currentSceneIndex = newIndex;
            }, 500);
        }

        forwardBtn.addEventListener('click', function() {
            let nextIndex = currentSceneIndex + 1;
            // If on last scene (journal), loop back to first scene (antares)
            if (nextIndex >= sceneOrder.length) {
                nextIndex = 0;
            }
            transitionToScene(nextIndex);
        });
        
        // Back Button - Transition to previous scene
        backBtn.addEventListener('click', function() {
            let prevIndex = currentSceneIndex - 1;
            // If on first scene (antares), loop to last scene (journal)
            if (prevIndex < 0) {
                prevIndex = sceneOrder.length - 1;
            }
            transitionToScene(prevIndex);
        });

        // Button Z-Index Management
        document.querySelectorAll('.image-button').forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.zIndex = '100';
            });
            button.addEventListener('mouseup', function() {
                this.style.zIndex = '5'; // Default higher z-index
            });
        });

        // All Button Actions with Modals and Chat Text
        const buttonActions = [
            // Antares Scene
            { id: 'pencil_case', modal: 'pencilCaseModal', text: "You found a sharp pencil! Be careful with this." },
            { id: 'locker', modal: 'lockerModal', text: "The locker contains old notebooks and memories." },
            { id: 'desk', modal: 'deskModal', text: "The desk has carved initials and doodles." },
            { id: 'backpack', modal: 'backpackModal', text: "The backpack is full of snacks and stationery." },
            
            // Heart Tree Scene
            { id: 'uke', modal: 'ukeModal', text: "The ukulele plays a sweet melody when touched." },
            { id: 'dodie', modal: 'dodieModal', text: "The notebook contains heartfelt scribbles." },
            { id: 'boba', modal: 'bobaModal', text: "A refreshing boba tea to quench your thirst." },
            { id: 'gucci', modal: '420gucciModal', text: "Special memories with friends." },
            
            // Screen Scene
            { id: 'mc', modal: 'mcModal', text: "Minecraft adventures together!" },
            { id: 'sdv', modal: 'sdvModal', text: "Stardew Valley farming memories." },
            { id: 'sky', modal: 'skyModal', text: "Sky: Children of Light moments." },
            { id: 'jam', modal: 'jamModal', text: "Jamming sessions and good times." },
            
            // Desktop Scene
            { id: 'yago', modal: 'yagoModal', text: "Yago-related memories." },
            { id: 'notes', modal: 'notesModal', text: "Musical notes and compositions." },
            { id: 'redbook', modal: 'redbookModal', text: "Red book of secrets." },
            { id: 'lego', modal: 'legoModal', text: "Building blocks of friendship." },
            
            // Journal Scene
            { id: 'entry1', modal: 'entry1Modal', text: "Journal entry from special day 1." },
            { id: 'entry2', modal: 'entry2Modal', text: "Journal entry from special day 2." },
            { id: 'entry3', modal: 'entry3Modal', text: "Journal entry from special day 3." },
            { id: 'entry4', modal: 'entry4Modal', text: "Journal entry from special day 4." }
        ];

        // Set up button click handlers for all scenes
        buttonActions.forEach(button => {
            const btnElement = document.getElementById(button.id);
            const modalElement = document.getElementById(button.modal);
            
            if (btnElement && modalElement) {
                btnElement.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // Track discovery
                    if (!discoveredButtons.has(button.id)) {
                        discoveredButtons.add(button.id);
                        updateDiscoveryCount();
                        btnElement.classList.add('new-discovery');
                        setTimeout(() => {
                            btnElement.classList.remove('new-discovery');
                        }, 1000);
                    }
                    
                    // Show modal and chat text
                    modalElement.classList.add('active');
                    typeWriter(chatText, button.text);
                });
            }
        });
        
        // Close modal when clicking anywhere
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.image-button[data-modal], .image-button[id]')) {
                document.querySelectorAll('.modal-overlay').forEach(modal => {
                    modal.classList.remove('active');
                });
                chatText.classList.remove('visible');
                
                // Ensure character returns to resting state
                if (resting) resting.style.display = 'block';
                if (talking) talking.style.display = 'none';
            }
        });

        // Initialize all scenes properly
        function initializeScenes() {
            // First hide all scenes
            Object.values(scenes).forEach(scene => {
                scene.style.display = 'none';
                scene.style.opacity = '0';
            });
            
            // Show only the first scene
            scenes.antares.style.display = 'block';
            setTimeout(() => {
                scenes.antares.style.opacity = '1';
            }, 50);
            
            // Set initial background
            body.style.backgroundImage = backgrounds.antares;
        }

        initializeScenes();
    }
});