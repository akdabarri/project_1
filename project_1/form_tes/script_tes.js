const questions = [
    {
        question: "Apa yang harus dilakukan jika lampu merah menyala?",
        options: ["Berhenti", "Lanjutkan", "Percepat", "Belok"],
        answer: 0
    },
    {
        question: "Apa yang harus dilakukan saat berkendara di jalan basah?",
        options: ["Akselerasi", "Berhati-hati", "Membuat cepat", "Berhenti mendadak"],
        answer: 1   
    },
    {
        question: "Apa yang harus Anda lakukan saat mendekati pejalan kaki?",
        options: ["Mempercepat", "Berhenti", "Membunyikan klakson", "Menyerempet"],
        answer: 1
    },
    {
        question: "Kapan Anda harus menggunakan lampu sein?",
        options: ["Saat berbelok", "Hanya di malam hari", "Saat mengemudi lurus", "Tidak perlu"],
        answer: 0
    },
    {
        question: "Apa yang harus dilakukan jika Anda merasa mengantuk saat mengemudi?",
        options: ["Terus berkendara", "Berhenti dan istirahat", "Minum kopi", "Mendengarkan musik"],
        answer: 1
    },
    {
        question: "Apa yang harus dilakukan jika mobil di depan Anda berhenti mendadak?",
        options: ["Menghindar", "Membunyikan klakson", "Berhenti juga", "Melaju cepat"],
        answer: 2
    },
    {
        question: "Kapan Anda harus mengenakan sabuk pengaman?",
        options: ["Hanya di jalan raya", "Selalu", "Saat mobil dalam kecepatan tinggi", "Tidak perlu"],
        answer: 1
    },
    {
        question: "Apa yang harus Anda lakukan saat melihat tanda stop?",
        options: ["Berhenti dan lihat", "Lanjutkan tanpa berhenti", "Membunyikan klakson", "Percepat"],
        answer: 0
    },
    {
        question: "Apa yang harus dilakukan jika Anda melihat mobil darurat?",
        options: ["Berhenti di tempat", "Memberi jalan", "Melaju cepat", "Mengikuti mobil tersebut"],
        answer: 1
    },
    {
        question: "Apa yang harus dilakukan saat berkendara di malam hari?",
        options: ["Tidak perlu lampu", "Gunakan lampu jauh", "Gunakan lampu dekat", "Hanya lampu hazard"],
        answer: 2
    },
];

let currentQuestionIndex = 0;
let timeLeft = 120; // 2 menit
let timerInterval;

const saveAnswer = () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        localStorage.setItem(`answer_${currentQuestionIndex}`, selectedOption.value);
    }
};

const displayQuestion = () => {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    questionElement.innerText = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = '';

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionHTML = `
            <label>
                <input type="radio" name="option" value="${index}" ${localStorage.getItem(`answer_${currentQuestionIndex}`) == index ? 'checked' : ''}>
                ${option}
            </label>
        `;
        optionsElement.innerHTML += optionHTML;
    });
};

const nextQuestion = () => {
    saveAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        calculateScore();
    }
};

const previousQuestion = () => {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
};

const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
        const storedAnswer = localStorage.getItem(`answer_${index}`);
        if (storedAnswer == question.answer) {
            score += 10; // Setiap jawaban benar bernilai 10
        }
    });

    // Reset jawaban di localStorage
    localStorage.clear();

    // Arahkan ke halaman sukses atau gagal
    if (score >= 80) {
        window.location.href = "sukses.html";
    } else {
        window.location.href = "gagal.html";
    }
};

const startTimer = () => {
    const timerElement = document.getElementById("timer");
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Waktu Habis!");
            calculateScore(); // Hitung skor ketika waktu habis
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    }, 1000);
};

// Kontrol musik
let isMusicPlaying = false;
const music = document.getElementById('backgroundMusic');

const startQuiz = () => {
    music.play();
    startTimer();
};

window.onload = () => {
    displayQuestion();
    startQuiz(); // Mulai kuis dan musik saat halaman dimuat
};
