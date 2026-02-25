
document.addEventListener('DOMContentLoaded', function () {
    
    // Swiper 슬라이더 설정
    var swiper = new Swiper(".reviewSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            500: { slidesPerView: 1.7 },
            750: { slidesPerView: 2.7, spaceBetween: 20 },
            950: { slidesPerView: 3.5 },
            1200: { slidesPerView: 4.3, spaceBetween: 30 },
        },
    });

    // 2. 예약 팝업
    const modal = document.getElementById('bookingModal');
    const bookingButtons = document.querySelectorAll('.open-booking');
    const closeBtn = document.querySelector('.close-modal');
    const dateSelect = document.getElementById('dateSelect');
    const monthTitle = document.getElementById('currentMonth');

    // 팝업 열기/닫기
    bookingButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); 
            modal.style.display = 'flex';
            generateDates(); 
        });
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    // 날짜 생성 (내일부터 7일간)
    function generateDates() {
        dateSelect.innerHTML = '<option value="" disabled selected>날짜를 선택해주세요</option>';
        const now = new Date();
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        monthTitle.innerText = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

        for (let i = 1; i <= 7; i++) {
            const targetDate = new Date(now);
            targetDate.setDate(now.getDate() + i);
            const dateString = `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일(${days[targetDate.getDay()]})`;
            const option = document.createElement('option');
            option.value = dateString;
            option.textContent = dateString;
            dateSelect.appendChild(option);
        }
    }

    // 예약 제출
    document.getElementById('submitBooking').onclick = () => {
        const d = dateSelect.value;
        const t = document.getElementById('timeSelect').value;
        if (!d || !t) { alert('날짜와 시간을 모두 선택해주세요.'); return; }
        alert(`${d} ${t}으로 상담 예약이 접수되었습니다.`);
        modal.style.display = 'none';
    };

    // --- 3. 스크롤 애니메이션 (Scroll Reveal) 추가 ---
    // Intersection Observer 설정
    const observerOptions = {
        root: null, // 브라우저 뷰포트 기준
        rootMargin: '0px',
        threshold: 0.15 // 대상 요소가 15% 이상 보일 때 작동
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 화면에 들어오면 active 클래스 추가
                entry.target.classList.add('active');
                // 한번 실행된 후에는 해제
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.element');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});