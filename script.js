// Elementos
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const audio = document.getElementById("bg-music");

// Frases caso ela tente clicar não
const phrases = [
    "Tem certeza disso?",
    "Pensa com carinho...",
    "Oh mor, não faz isso comigo!",
    "Vou ficar tão titi...",
    "O outro botão é mais bonito!",
    "Olha para mim, o gatinho preto...",
    "Sério mesmo?",
    "Faço qualquer coisa!",
    "Essa música me lembra a gente...",
    "Quero casar com você!",
    "Prometo ser o melhor gato preto da sua vida!"
];

// Lista de elogios
const koreanPhrases = [
    "너무 예뻐",             // Muito linda (Neomu yeppeo)
    "사랑해 ❤️",            // Te amo (Saranghae)
    "귀여워",               // Fofa (Gwiyeowo)
    "내 사랑",             // Meu amor (Nae sarang)
    "보고 싶어",           // Sinto sua falta (Bogo sipeo)
    "넌 나의 천사",        // Você é meu anjo (Neon naui cheonsa)
    "빛나는 별 ✨",       // Estrela brilhante (Binnaneun byeol)
    "심쿵!",             // Batida de coração forte/Crush (Simkung)
    "보라해 💜",          // I purple you
    "뽀뽀 💋",           // Beijinho
    "안아줘",             // Me abrace
    "영원히",             // Para sempre
    "자기야",             // Querida/Honey
    "설레다"              // Coração vibrando
];

function addKoreanNotes() {
    const container = document.body;
    
    koreanPhrases.forEach((text, index) => {
        const note = document.createElement("div");
        note.classList.add("korean-note");
        note.innerText = text;
        
        let randomX, randomY;
        const isLeft = Math.random() > 0.5;
        
        if (isLeft) {
            randomX = Math.random() * 30; 
        } else {
            randomX = 70 + Math.random() * 25;
        }
        
        randomY = Math.random() * 90;

        note.style.left = randomX + "%";
        note.style.top = randomY + "%";

        const rotation = (Math.random() * 40) - 20;
        note.style.setProperty('--rotation', rotation + 'deg');

        note.style.animationDelay = (index * 0.2) + "s";

        container.appendChild(note);
    });
}

document.addEventListener("DOMContentLoaded", addKoreanNotes);

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);

    audio.volume = 0.095;
    audio.play();
});

// Mover o botão pela pág
noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 400;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 4;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    title.textContent = randomPhrase;
});

// Clicar sim
// Mensagem que será digitada
const messageText = "Eu sabia que você diria sim! \nEu te amo ❤️";


if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        if (catImg) catImg.src = "assets/cat_dance.gif";

        const letterWindow = document.querySelector(".letter-window");
        if (letterWindow) letterWindow.classList.add("final");

        if (buttons) buttons.style.display = "none";

        createHeartShower();

        setTimeout(() => {
            if (finalText) {
                finalText.style.display = "block";
                finalText.innerHTML = "";
                typeWriter(messageText, finalText);
            }
        }, 1000);
    });
}

function typeWriter(text, element, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        element.classList.add("typing-effect");

        setTimeout(() => typeWriter(text, element, i + 1), 50);
    } else {
        element.classList.remove("typing-effect");
        showTicket()
    }
}


// Chuva de corações
function createHeartShower() {
    const heartCount = 50;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart-confetti");
            heart.innerHTML = "❤️"; 

            heart.style.left = Math.random() * 100 + "vw";

            const size = Math.random() * 20 + 20; 
            heart.style.fontSize = `${size}px`;

            const duration = Math.random() * 3 + 2;
            heart.style.animationDuration = `${duration}s`;
            
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, i * 100);
    }
}

// Ticket
function showTicket() {
    const ticketHTML = `
        <div class="ticket-overlay" id="ticket-modal">
            <div class="ticket-popup">
                <div class="ticket-header">-- Ticket de confirmação --</div>
                <div class="ticket-body">Passe de Namorada</div>
                <div class="ticket-footer">Válido apenas com seu amor e por toda eternidade</div>
                <div class="ticket-stamp">❤</div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', ticketHTML);

    setTimeout(() => {
        const modal = document.getElementById("ticket-modal");
        if(modal) {
            modal.classList.add("visible");
        }
    }, 1500);
}