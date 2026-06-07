const guides = [
    {
        id: "steam-guide",
        title: "Как пополнить баланс Steam в СНГ с минимальной комиссией",
        platform: "steam",
        platformText: "Steam",
        description: "Сравниваем способы пополнения: через скины, WebMoney, торговые площадки и банки. Где теряем меньше всего денег?",
        image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=500",
        fullText: `
            <div class="modal-body-content">
                <h2>Пополнение Steam в СНГ (Актуально на 2026 год)</h2>
                <p>Прямое пополнение карт РФ заблокировано, но есть 3 отличных рабочих способа:</p>
                <h3>Способ 1: Через WebMoney (Комиссия ~1-4%)</h3>
                <p>Самый выгодный математически способ, но требует создания кошелька WMZ.</p>
                <h3>Способ 2: Покупка скинов на маркетах (Уход в ПЛЮС)</h3>
                <p>Покупаете скины за реальные деньги на сторонних площадках, а продаете на торговой площадке Steam дороже.</p>
                <h3>Способ 3: Специализированные сервисы (Быстро и просто)</h3>
                <div class="profit-box">
                    <strong>Рекомендуемый сервис:</strong> 
                    Для быстрой отправки средств без лишней регистрации рекомендуем использовать <a href="https://donatov.net/inv/3446760" target="_blank">Donatov.net</a>. 
                    <br><br>
                    <strong>Инструкция:</strong> Просто перейдите по ссылке, выберите пополнение Steam, укажите свой <strong>логин</strong> и сумму. Деньги приходят на баланс аккаунта моментально.
                </div>
            </div>
        `
    },
    {
        id: "ps-guide",
        title: "Где сейчас покупать подписку PlayStation Plus и игры",
        platform: "playstation",
        platformText: "PlayStation",
        description: "Инструкция по покупке через Турцию, Индию и Украину. Как создать аккаунт и где безопасно брать карты оплаты.",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=500",
        fullText: `
            <div class="modal-body-content">
                <h2>Гайд по PlayStation Store в СНГ</h2>
                <p>Российский PS Store закрыт, единственный выход — играть через зарубежный профиль (Турция, Индия, Украина).</p>
                <h3>Как покупать игры и PS Plus?</h3>
                <ul>
                    <li><strong>Карты оплаты:</strong> Подходят для США/Польши (продаются на маркетплейсах).</li>
                    <li><strong>Посредники:</strong> Покупка через проверенных продавцов с передачей аккаунта.</li>
                </ul>
            </div>
        `
    },
    {
        id: "xbox-guide",
        title: "Покупка Xbox Game Pass Ultimate: способ для экономных",
        platform: "xbox",
        platformText: "Xbox",
        description: "Как активировать подписку на 12 месяцев вперед в разы дешевле официального магазина через ключи конвертации.",
        image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=500",
        fullText: `
            <div class="modal-body-content">
                <h2>Экономим на Xbox Game Pass Ultimate</h2>
                <p>Официальный способ сэкономить — конвертация простой подписки Core в Ultimate под VPN.</p>
            </div>
        `
    }
];

const container = document.getElementById('guides-container');
const buttons = document.querySelectorAll('.nav-btn');
const modal = document.getElementById('guide-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle');

let currentFilter = 'all';

// Инициализация Избранного из localStorage
let favorites = JSON.parse(localStorage.getItem('wazzup_favorites')) || [];

// Переключение ТЕМЫ
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ЛОГИКА КАЛЬКУЛЯТОРА
const calcAmount = document.getElementById('calc-amount');
const calcMethod = document.getElementById('calc-method');
const totalToPay = document.getElementById('total-to-pay');
const totalCommission = document.getElementById('total-commission');
const calcActionBtn = document.getElementById('calc-action-btn');

function calculateTariff() {
    if (!calcAmount || !calcMethod) return;
    const amount = parseFloat(calcAmount.value) || 0;
    const method = calcMethod.value;

    let commissionPercent = 0.07; // donatov по умолчанию
    if (method === 'webmoney') commissionPercent = 0.03;
    if (method === 'qiwi-kz') commissionPercent = 0.18;

    const commission = Math.round(amount * commissionPercent);
    const total = Math.round(amount + commission);

    totalToPay.innerText = `${total} ₽`;
    totalCommission.innerText = `${commission} ₽`;

    // Если выбран donatov, ведем на рефку, иначе просто скрываем/меняем ссылку
    if (method === 'donatov') {
        calcActionBtn.href = "https://donatov.net/inv/3446760";
        calcActionBtn.style.display = "inline-block";
        calcActionBtn.innerText = "Пополнить баланс";
    } else {
        calcActionBtn.href = "#";
        calcActionBtn.innerText = "Инструкция ниже";
    }
}

if (calcAmount && calcMethod) {
    calcAmount.addEventListener('input', calculateTariff);
    calcMethod.addEventListener('change', calculateTariff);
    calculateTariff();
}

// Переключение Избранного
window.toggleFavorite = function(guideId, event) {
    event.stopPropagation(); // чтобы не открывалась модалка при клике по звезде
    const index = favorites.indexOf(guideId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(guideId);
    }
    localStorage.setItem('wazzup_favorites', JSON.stringify(favorites));
    renderGuides(currentFilter);
};

// Вывод карточек
function renderGuides(filter = 'all') {
    if (!container) return;
    container.innerHTML = '';
    currentFilter = filter;

    let filtered = guides;
    if (filter === 'favorites') {
        filtered = guides.filter(item => favorites.includes(item.id));
    } else if (filter !== 'all') {
        filtered = guides.filter(item => item.platform === filter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Здесь пока ничего нет.</p>`;
        return;
    }

    filtered.forEach((guide) => {
        const isFav = favorites.includes(guide.id);
        const card = document.createElement('div');
        card.classList.add('card');

        // Получаем индекс исходного массива для модалки
        const originalIndex = guides.findIndex(g => g.id === guide.id);

        card.innerHTML = `
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${guide.id}', event)">
                ${isFav ? '★' : '☆'}
            </button>
            <img src="${guide.image}" alt="${guide.title}" class="card-img">
            <div class="card-content">
                <span class="badge">${guide.platformText}</span>
                <h3>${guide.title}</h3>
                <p>${guide.description}</p>
                <button class="card-btn" onclick="openGuide(${originalIndex})">Читать инструкцию</button>
            </div>
        `;
        container.appendChild(card);
    });
}

window.openGuide = function(index) {
    if (modalBody && modal) {
        modalBody.innerHTML = guides[index].fullText;
        modal.style.display = 'flex';
    }
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) { modal.style.display = 'none'; }
});

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const platform = btn.getAttribute('data-platform') || 'all';
        renderGuides(platform);
    });
});

renderGuides();