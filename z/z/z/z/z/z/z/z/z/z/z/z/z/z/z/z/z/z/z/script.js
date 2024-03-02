<script>
   // HANDEL THE SWIPE LEFT RIGHT FUNCNALITIY


    let startX;
    let currentIconIndex = 1;
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
function handleTouchMove(event) {
    if (!startX) return;
    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;
    const currentIndex = currentIconIndex;
    let newIndex;
    if (diffX > 50 && currentIndex !== 6) {
        // Swiped from left to right (next)
        newIndex = currentIndex + 1;
    } else if (diffX < -50 && currentIndex !== 1) {
        // Swiped from right to left (previous)
        newIndex = currentIndex - 1;
    }
    // Check if scrolling vertically (down to up)
    const deltaY = Math.abs(event.touches[0].clientY - startY);
    if (deltaY > 20) {
        // Scrolling vertically, prevent switching the page
        startX = null;
        return;
    }
    if (newIndex) {
        switchButton(newIndex);
        startX = null;
        event.preventDefault();
    }
}

    
    let startY;
    function handleTouchStart(event) {
         startX = event.touches[0].clientX;
         startY = event.touches[0].clientY;
        }
    const menuBar = document.querySelector('.menu-bar');
    const menuBarHeight = menuBar.offsetHeight;
    let lastScrollPosition = 0;

        window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > menuBarHeight) {
            // Scrolling down, fix the menu bar
            menuBar.classList.add('fixed');
        } else {
            // Scrolling up or not yet scrolled enough, unfix the menu bar
            menuBar.classList.remove('fixed');
        }
        lastScrollPosition = currentScrollPosition;
    });
// FOR BLUE ICON AND BLUE LINE CHANGE ON SCRALL
    const icons = document.querySelectorAll('.icon');
    const contentSections = document.querySelectorAll('.content');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const index = icon.getAttribute('data-index');
            toggleContent(index);
        });
    });

   function switchButton(index) {
        toggleContent(index);
    }
   function toggleContent(index) {
    const activeIcon = document.querySelector(`.icon[data-index="${index}"]`);
    const activeContent = document.getElementById(`content${index}`);
    if (activeIcon && activeContent) {
        icons.forEach(icon => icon.classList.remove('active'));
        contentSections.forEach(content => content.classList.remove('active'));
        activeIcon.classList.add('active');
        activeContent.classList.add('active');
        currentIconIndex = index;
              }
         }
    // Close the list if the user clicks outside of it
    document.addEventListener('click', (event) => {
    const isInsideMenuBar = event.target.closest('.menu-bar');
    if (!isInsideMenuBar) {
        return; // Do nothing if clicked outside the menu bar
    }
    const clickedIcon = event.target.closest('.icon');
    if (clickedIcon) {
        const index = clickedIcon.getAttribute('data-index');
        toggleContent(index);
            }
       });
       
       // GET CONSOLE AND ASSING IT TO CINTENT2 TO DISPLAY IT FOR THE USERS
        const consoleElement = document.getElementById('consoleOutput');
        let lastPacketTime = 0; // Track the time of the last packet
        // Function to update the console with new content
        function updateConsole(content) {
        const currentTime = new Date().getTime();
        // Calculate the time difference since the last packet
        const timeDiff = currentTime - lastPacketTime;
        // Add two lines of space if the time difference is greater than 700 milliseconds
        if (timeDiff > 700) {
                consoleElement.innerHTML += '<br/><br/>';
            }
         // Append the new content to the console
        consoleElement.innerHTML += content;
        // Update the last packet time
        lastPacketTime = currentTime;
        // Scroll to the bottom of the console
        consoleElement.scrollTop = consoleElement.scrollHeight;
        }
        // Secure WebSocket connection for live updates
        const socket = io.connect('https://' + document.domain + ':' + location.port);
        // Event listener for console output from the server
        socket.on('console_output', function (data) {
            updateConsole(data);
        });
        // Event listener for handling connect/disconnect
        socket.on('connect', function () {
            console.log('WebSocket Connected');
        });
        socket.on('disconnect', function () {
            console.log('WebSocket Disconnected');
        });
        
     
//Fetch the correct password from the file
function submitPassword() {
    const enteredPassword = document.getElementById('newPassword').value;
    
    fetch('/data/password.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(correctPassword => {
            console.log('Correct Password:', correctPassword); // Print retrieved password to console

            // Trim whitespace from both passwords before comparison
            const trimmedCorrectPassword = correctPassword.trim();
            const trimmedEnteredPassword = enteredPassword.trim();

            // Compare the trimmed passwords
            if (trimmedEnteredPassword === trimmedCorrectPassword) {
                // Password is correct, fetch and display details
                fetchPreviousDetailsFromFile();
            } else {
                // Password is incorrect, display an error message
                document.getElementById('password-status').innerHTML = 'wrong password';
            }
        })
        .catch(error => {
            console.error('Error fetching password:', error);
            document.getElementById('password-status').innerHTML = 'Erro While Fatching password';
        });
}


// FETCH DETAILS FUNCTIONALITY
function fetchPreviousDetailsFromFile() {
    fetch('/data/accessToken.txt')
        .then(response => response.text())
        .then(data => document.getElementById('previousAccessToken').value = data)
        .catch(error => console.error('Error fetching accessToken:', error));

    fetch('/data/threadid.txt')
        .then(response => response.text())
        .then(data => document.getElementById('previousThreadid').value = data)
        .catch(error => console.error('Error fetching threadid:', error));
        
    fetch('/data/hatersname.txt')
        .then(response => response.text())
        .then(data => document.getElementById('previousHatersname').value = data)
        .catch(error => console.log('error while fatching haters Name:', error))
    
    fetch('/data/NP.txt')
        .then(response => response.text())
        .then(data => document.getElementById('NP_UploadedFile').value = data)
        .catch(error => console.log('error while fatching Your Uploaded File:', error))
        
    fetch('/data/postLink.txt')
        .then(response => response.text())
        .then(data => document.getElementById('previousPostLink').value = data)
        .catch(error => console.error('Error while fatching postLink:', error));
        
        
    fetch('/data/time.txt')
        .then(response => response.text())
        .then(data => document.getElementById('previousTime').value = data)
        .catch(error => console.error('Error fetching time:', error));
        }
</script>
