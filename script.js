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

        setTimeout(() => typeWriter(text, element, i + 1), 2);
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
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const ticketHTML = `
        <div class="ticket-overlay" id="ticket-modal">
            <div class="ticket-popup">
                
                <div class="ticket-left">
                    <div class="ticket-header">Vale Compromisso</div>
                    <div class="ticket-body">Namorados, noivos e eternos.</div>
                    <p class="ticket-date-stub">De alguém especial para alguém mais especial ainda. Com esse vale, você encontrará a felicidade e parceria por toda a eternidade. Como promessa, como pessoa, ao longo do tempo, viajaremos juntos por mais de dez anos e acabaremos juntos após criarmos um campo de flores usando magia.</p>
                    <div class="ticket-stamp">❤</div>
                </div>

                <div class="ticket-right">
                    
                    <div class="share-wrapper">
                        <div class="share-btn" id="wa-share-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382C17.119 14.205 15.429 13.37 15.113 13.253C14.796 13.136 14.565 13.077 14.334 13.429C14.103 13.782 13.447 14.545 13.245 14.78C13.044 15.015 12.842 15.044 12.489 14.868C12.136 14.691 10.998 14.319 9.649 13.116C8.586 12.168 7.868 10.998 7.665 10.646C7.463 10.293 7.644 10.105 7.821 9.929C7.979 9.771 8.173 9.518 8.349 9.312C8.525 9.106 8.584 8.959 8.701 8.724C8.818 8.489 8.759 8.283 8.671 8.107C8.583 7.931 7.879 6.198 7.586 5.493C7.299 4.812 7.012 4.905 6.805 4.905C6.613 4.905 6.394 4.905 6.175 4.905C5.956 4.905 5.602 4.987 5.302 5.316C5.002 5.645 4.148 6.444 4.148 8.067C4.148 9.69 5.33 11.258 5.499 11.487C5.667 11.717 7.854 15.09 11.203 16.535C12.001 16.879 12.624 17.085 13.11 17.239C13.91 17.493 14.636 17.463 15.212 17.377C15.854 17.281 17.189 16.569 17.467 15.787C17.744 15.005 17.744 14.336 17.662 14.195C17.58 14.054 17.355 13.97 17.002 13.794H17.472ZM12.006 21.683C10.217 21.683 8.548 21.222 7.086 20.42L6.726 20.206L3 21.183L3.996 17.545L3.762 17.173C2.887 15.782 2.426 14.17 2.426 12.518C2.426 7.234 6.723 2.936 12.011 2.936C14.57 2.936 16.974 3.933 18.782 5.744C20.59 7.554 21.588 9.962 21.587 12.522C21.587 17.802 17.289 22.103 12.006 21.683Z"/>
                            </svg>
                        </div>
                        <span class="share-label">Compartilhe</span>
                    </div>
                    
                    <div class="ticket-date-stub">
                        ${dateString}
                    </div>

                </div>

            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', ticketHTML);

    setTimeout(() => {
        const modal = document.getElementById("ticket-modal");
        if (modal) modal.classList.add("visible");

        const waBtn = document.getElementById("wa-share-btn");
        if(waBtn) {
            waBtn.addEventListener("click", () => {
                const seuNumero = "557181984714"; 

                const mensagem = "Sapito, eu aceito o vale";

                const link = `https://wa.me/${seuNumero}?text=${encodeURIComponent(mensagem)}`;
                window.open(link, '_blank');
            });
        }
    }, 100);
}