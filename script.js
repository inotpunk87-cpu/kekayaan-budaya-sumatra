// script.js

// =========================================================
// 0. DATA REGIONAL UNTUK PETA
// =========================================================
const regionalData = {
    "Aceh": {
        h3: "Aceh: Tanah Rencong dan Tari Saman",
        p: "Aceh dikenal dengan sejarah perlawanan terhadap penjajah, seni tari Saman yang energik, dan kuliner seperti Mie Aceh. Filosofi budaya Aceh menekankan persatuan dan keberanian.",
        videos: [
            { name: "Tari Saman Aceh", url: "https://www.youtube.com/watch?v=example1" },
            { name: "Sejarah Aceh", url: "https://www.youtube.com/watch?v=example2" }
        ]
    },
    "Sumut": {
        h3: "Sumatera Utara: Warisan Batak dan Danau Toba",
        p: "Sumatera Utara kaya akan budaya Batak dengan sistem Marga, Ulos sebagai kain adat, dan Danau Toba sebagai ikon wisata. Budaya ini menekankan kekerabatan dan kehidupan sosial.",
        videos: [
            { name: "Ulos Batak", url: "https://www.youtube.com/watch?v=example3" },
            { name: "Danau Toba", url: "https://www.youtube.com/watch?v=example4" }
        ]
    },
    "Sumbar": {
        h3: "Sumatera Barat: Rumah Gadang dan Matrilineal",
        p: "Sumatera Barat terkenal dengan arsitektur Rumah Gadang, sistem Matrilineal Minangkabau, dan kuliner Rendang. Filosofi 'Adat Basandi Syarak' menjadi landasan hidup masyarakatnya.",
        videos: [
            { name: "Rumah Gadang", url: "https://www.youtube.com/watch?v=example5" },
            { name: "Adat Minangkabau", url: "https://www.youtube.com/watch?v=example6" }
        ]
    }
};

// =========================================================
// 1. DATA KUIS (5 Soal Set 2)
// =========================================================
const quizQuestions = [
    {
        question: "Bangunan adat di Sumatra Barat yang atapnya menyerupai tanduk kerbau, melambangkan kemenangan filosofis, adalah...?",
        options: ["Rumah Bolon (Batak)", "Rumah Gadang (Minangkabau)", "Rumah Lamo (Jambi)", "Krong Bade (Aceh)"],
        answer: "Rumah Gadang (Minangkabau)",
        explanation: "Atap khas Rumah Gadang (gonjong) menyerupai tanduk kerbau (Filosofi Tambi), melambangkan kemenangan masyarakat Minangkabau."
    },
    {
        question: "Dalam sistem Matrilineal Minangkabau, yang bertanggung jawab untuk mengurus dan membimbing kemenakan (anak dari saudara perempuan) adalah...?",
        options: ["Ayah Kandung", "Ibu Kandung", "Mamanda (Saudara laki-laki dari Ibu)", "Niniak Mamak (Kepala Adat)"],
        answer: "Mamanda (Saudara laki-laki dari Ibu)",
        explanation: "Dalam Matrilineal, Mamanda (paman dari pihak ibu) memegang tanggung jawab adat dan pembimbingan utama bagi kemenakan."
    },
    {
        question: "Jenis Ulos yang paling sakral dan sering diberikan pada upacara pernikahan untuk melambangkan harapan hidup yang penuh berkah dan keturunan adalah...?",
        options: ["Ulos Ragidup", "Ulos Bolean", "Ulos Sibolang", "Ulos Sadum"],
        answer: "Ulos Ragidup",
        explanation: "Ulos Ragidup (arti: kain corak hidup) adalah ulos tertinggi yang melambangkan harapan akan kehidupan yang bahagia dan berketurunan."
    },
    {
        question: "Kekompakan yang luar biasa dalam Tari Saman (Aceh) mencerminkan filosofi utama masyarakat Gayo yang disebut...?",
        options: ["Cingkariang (Penuh Semangat)", "Mamak (Garis Keturunan)", "Seukat (Persatuan)", "Manortor (Menari)"],
        answer: "Seukat (Persatuan)",
        explanation: "Seukat adalah istilah Gayo yang merujuk pada filosofi persatuan, kekompakan, dan gotong royong yang diwujudkan dalam gerakan Saman."
    },
    {
        question: "Selain sebagai simbol kekerabatan, fungsi utama Tari Saman di masa lampau adalah sebagai sarana untuk...?",
        options: ["Upacara Perburuan", "Penyebaran Agama Islam (Dakwah)", "Ritual Menanam Padi", "Latihan Militer"],
        answer: "Penyebaran Agama Islam (Dakwah)",
        explanation: "Tari Saman diciptakan oleh Syekh Saman sebagai sarana dakwah, di mana syair-syairnya mengandung pesan agama dan moral."
    }
];

// =========================================================
// 2. LOGIKA KUIS
// =========================================================
const startButton = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const resultBox = document.getElementById('result');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    resultBox.innerHTML = '';
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const q = quizQuestions[index];
    questionElement.textContent = `Pertanyaan ${index + 1}: ${q.question}`;
    optionsElement.innerHTML = '';

    q.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(button, q.answer, q.explanation));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedButton, correctAnswer, explanation) {
    Array.from(optionsElement.children).forEach(btn => {
        btn.disabled = true;
    });

    const isCorrect = selectedButton.textContent === correctAnswer;

    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
        Array.from(optionsElement.children).find(btn => btn.textContent === correctAnswer).classList.add('correct');
    }

    displayExplanation(isCorrect, explanation);
    nextButton.style.display = 'block';
}

function displayExplanation(isCorrect, explanation) {
    const explanationDiv = document.createElement('div');
    explanationDiv.id = 'explanation';
    explanationDiv.innerHTML = `
        <p><strong>${isCorrect ? 'Benar!' : 'Salah!'}</strong></p>
        <p>${explanation}</p>
    `;
    resultBox.innerHTML = '';
    resultBox.appendChild(explanationDiv);
}

function nextQuestion() {
    currentQuestionIndex++;
    resultBox.innerHTML = '';
    nextButton.style.display = 'none';

    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    
    let message = '';
    if (score === quizQuestions.length) {
        message = 'Selamat! Wawasan Anda Luar Biasa. Anda Ahli Budaya Sumatera!';
    } else if (score >= quizQuestions.length / 2) {
        message = 'Bagus! Wawasan Budaya Anda Cukup Mendalam.';
    } else {
        message = 'Terus tingkatkan wawasan Anda. Mari pelajari lagi artikel-artikel di atas!';
    }

    resultBox.innerHTML = `
        <div class="final-result">
            <h3>Kuis Selesai!</h3>
            <p class="score-text">Anda mendapatkan skor <b>${score} dari ${quizQuestions.length}</b></p>
            <p>${message}</p>
            <button class="start-btn" onclick="startQuiz()">Ulangi Kuis</button>
        </div>
    `;
}

// Event Listeners Kuis
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);


// =========================================================
// 3. LOGIKA PETA INTERAKTIF
// =========================================================

// Variabel untuk peta
const mapPaths = document.querySelectorAll('.sumatra-map path');
const detailCard = document.getElementById('detail-budaya');
const mediaLinks = document.getElementById('media-links');

// Event Listener pada setiap Path (Provinsi)
mapPaths.forEach(path => {
    path.addEventListener('click', () => {
        // Hapus class 'active' dari semua path
        mapPaths.forEach(p => p.classList.remove('active'));

        // Tambahkan class 'active' ke path yang diklik
        path.classList.add('active');

        const regionName = path.getAttribute('data-region');
        const data = regionalData[regionName];

        if (data) {
            // Update Detail Card
            detailCard.querySelector('h3').innerHTML = `<i class="fas fa-map-pin"></i> ${data.h3}`;
            detailCard.querySelector('p').textContent = data.p;

            // Update Video Links
            mediaLinks.innerHTML = '<h4>Tautan Video Edukasi:</h4>';
            data.videos.forEach(video => {
                const link = document.createElement('a');
                link.href = video.url;
                link.target = '_blank';
                link.classList.add('detail-link');
                link.innerHTML = `<i class="fab fa-youtube"></i> ${video.name}`;
                mediaLinks.appendChild(link);
            });
        }
    });
});
