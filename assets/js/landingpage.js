
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
        640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3.5,
        },
        1024: {
            slidesPerView: 4.3,
            spaceBetween: 30,
        },
    },
});



document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('bookingModal');
    // const openBtn = document.querySelector('.header-btn'); // 헤더의 상담예약 버튼
    const bookingButtons = document.querySelectorAll('.open-booking')
    const closeBtn = document.querySelector('.close-modal');
    const dateSelect = document.getElementById('dateSelect');
    const monthTitle = document.getElementById('currentMonth');

    // 1. 팝업 열기/닫기
    bookingButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // a 태그일 경우 페이지 이동 방지
            modal.style.display = 'flex';
            generateDates(); // 팝업 열 때 날짜 생성
        });
    });
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    // 2. 날짜 생성 로직 (내일부터 7일간)
    function generateDates() {
        dateSelect.innerHTML = '<option value="" disabled selected>날짜를 선택해주세요</option>';
        const now = new Date();
        const days = ['일', '월', '화', '수', '목', '금', '토'];

        // 헤더 월 표시 (현재 월 기준)
        monthTitle.innerText = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

        for (let i = 1; i <= 7; i++) {
            const targetDate = new Date(now);
            targetDate.setDate(now.getDate() + i); // i일 뒤

            const year = targetDate.getFullYear();
            const month = targetDate.getMonth() + 1;
            const date = targetDate.getDate();
            const dayName = days[targetDate.getDay()];

            const dateString = `${year}년 ${month}월 ${date}일(${dayName})`;

            const option = document.createElement('option');
            option.value = dateString;
            option.textContent = dateString;
            dateSelect.appendChild(option);
        }
    }

    // 3. 예약 완료 버튼 클릭 시
    document.getElementById('submitBooking').onclick = () => {
        const d = dateSelect.value;
        const t = document.getElementById('timeSelect').value;

        if (!d || !t) {
            alert('날짜와 시간을 모두 선택해주세요.');
            return;
        }

        alert(`${d} ${t}으로 상담 예약이 접수되었습니다.`);
        modal.style.display = 'none';
    };
});