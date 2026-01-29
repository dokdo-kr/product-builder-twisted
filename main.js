document.addEventListener('DOMContentLoaded', () => {
  const recommendButton = document.getElementById('recommend-button');
  const resultText = document.getElementById('result-text');
  const mealTimeOptionsContainer = document.getElementById('meal-time-options');

  // New, significantly expanded menu data for office workers
  const menuData = [
    // 한식 (Korean)
    { name: '김치찌개', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '된장찌개', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '제육볶음', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '불고기', mealTimes: ['점심', '저녁'], groupSize: ['여럿이서'] },
    { name: '비빔밥', mealTimes: ['점심'], groupSize: ['혼자', '여럿이서'] },
    { name: '순두부찌개', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '부대찌개', mealTimes: ['점심', '저녁'], groupSize: ['여럿이서'] },
    { name: '설렁탕', mealTimes: ['아침', '점심'], groupSize: ['혼자'] },
    { name: '감자탕', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '삼계탕', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '국밥', mealTimes: ['아침', '점심', '저녁'], groupSize: ['혼자'] },
    { name: '육개장', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '갈비탕', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '닭볶음탕', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '찜닭', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '아구찜', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '김치찜', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '콩나물국밥', mealTimes: ['아침', '점심'], groupSize: ['혼자'] },
    { name: '해장국', mealTimes: ['아침', '점심'], groupSize: ['혼자'] },
    { name: '보쌈', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '족발', mealTimes: ['저녁'], groupSize: ['여럿이서'] },

    // 중식 (Chinese)
    { name: '짜장면', mealTimes: ['점심'], groupSize: ['혼자'] },
    { name: '짬뽕', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '탕수육', mealTimes: ['점심', '저녁'], groupSize: ['여럿이서'] },
    { name: '마라탕', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '볶음밥', mealTimes: ['점심'], groupSize: ['혼자'] },
    { name: '깐풍기', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '양장피', mealTimes: ['저녁'], groupSize: ['여럿이서'] },

    // 일식 (Japanese)
    { name: '돈까스', mealTimes: ['점심'], groupSize: ['혼자', '여럿이서'] },
    { name: '초밥', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '라멘', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '우동', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '회덮밥', mealTimes: ['점심'], groupSize: ['혼자'] },
    { name: '규동', mealTimes: ['점심'], groupSize: ['혼자'] },
    { name: '야끼소바', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '카레', mealTimes: ['점심'], groupSize: ['혼자'] },
    { name: '벤또', mealTimes: ['점심'], groupSize: ['혼자'] },

    // 양식 (Western)
    { name: '파스타', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '피자', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '스테이크', mealTimes: ['저녁'], groupSize: ['여럿이서'] },
    { name: '햄버거', mealTimes: ['점심'], groupSize: ['혼자'] },
    { name: '샌드위치', mealTimes: ['아침', '점심'], groupSize: ['혼자'] },
    { name: '샐러드', mealTimes: ['아침', '점심'], groupSize: ['혼자'] },
    { name: '리조또', mealTimes: ['점심', '저녁'], groupSize: ['혼자'] },
    { name: '수제버거', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },

    // 동남아/멕시칸 등 기타 (Southeast Asian/Mexican, etc.)
    { name: '쌀국수', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '팟타이', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '타코', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '퀘사디아', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '카레 (인도식)', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '나시고랭', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },

    // 간식/야식 (Snacks/Late-night snacks)
    { name: '떡볶이', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '치킨', mealTimes: ['저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '피자', mealTimes: ['저녁'], groupSize: ['여럿이서'] }, // Added again for snack category, can be refined.
    { name: '만두', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
    { name: '튀김', mealTimes: ['점심', '저녁'], groupSize: ['혼자', '여럿이서'] },
  ];

  function setDefaultOptions() {
    // Set default meal time
    const currentHour = new Date().getHours();
    let mealTime = '저녁'; // Default
    if (currentHour >= 5 && currentHour < 10) mealTime = '아침';
    else if (currentHour >= 10 && currentHour < 16) mealTime = '점심';
    
    const mealTimeInput = document.querySelector(`input[name="mealTime"][value="${mealTime}"]`);
    if (mealTimeInput) {
      mealTimeInput.checked = true;
    }
    
    // Set default group size
    const groupSizeInput = document.querySelector('input[name="groupSize"][value="혼자"]');
    if (groupSizeInput) {
        groupSizeInput.checked = true;
    }
  }

  // Event delegation for mealTime and groupSize option selection
  // This ensures the visual feedback is applied correctly
  document.querySelectorAll('.options-group').forEach(group => {
    group.addEventListener('change', (event) => {
        const changedInput = event.target;
        if (changedInput.type === 'radio') {
            // Find all labels in the same radio group
            const radioGroupName = changedInput.name;
            document.querySelectorAll(`input[name="${radioGroupName}"]`).forEach(radioInput => {
                radioInput.parentElement.classList.toggle('selected', radioInput.checked);
            });
        }
    });
  });


  recommendButton.addEventListener('click', () => {
    const selectedMealTime = document.querySelector('input[name="mealTime"]:checked');
    const selectedGroupSize = document.querySelector('input[name="groupSize"]:checked');

    if (!selectedMealTime || !selectedGroupSize) {
      alert('식사 시간과 인원을 모두 선택해주세요!');
      return;
    }

    const meal = selectedMealTime.value;
    const groupSize = selectedGroupSize.value;

    const filteredMenu = menuData.filter(item => {
      const mealMatch = item.mealTimes.includes(meal);
      const groupMatch = item.groupSize.includes(groupSize);
      return mealMatch && groupMatch;
    });

    if (filteredMenu.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMenu.length);
      resultText.textContent = `오늘은 '${filteredMenu[randomIndex].name}' 어떠세요?`;
    } else {
      resultText.textContent = '아쉽게도 모든 조건에 맞는 추천 메뉴가 없습니다. 다른 조합을 시도해보세요!';
    }
  });

  setDefaultOptions();
  // Manually trigger change event to apply initial visual selection
  document.querySelector('input[name="mealTime"]:checked')?.dispatchEvent(new Event('change', { bubbles: true }));
  document.querySelector('input[name="groupSize"]:checked')?.dispatchEvent(new Event('change', { bubbles: true }));
});