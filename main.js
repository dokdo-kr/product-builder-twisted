document.addEventListener('DOMContentLoaded', () => {
  const recommendButton = document.getElementById('recommend-button');
  const resultText = document.getElementById('result-text');
  const mealTimeOptionsContainer = document.getElementById('meal-time-options');
  const foodTypeOptionsContainer = document.getElementById('food-type-options');

  // New, flexible menu data structure
  const menuData = [
    { name: '김치찌개', mealTimes: ['아침', '점심', '저녁'], situations: ['혼자 간단히', '든든하게 한 끼'], constraints: ['자극적인 음식 OK', '집에서 해먹기'], foodTypes: ['밥', '찌개'] },
    { name: '된장찌개', mealTimes: ['아침', '점심', '저녁'], situations: ['혼자 간단히', '가족 식사'], constraints: ['속 편한 음식', '집에서 해먹기'], foodTypes: ['밥', '찌개'] },
    { name: '순두부찌개', mealTimes: ['아침', '점심'], situations: ['혼자 간단히', '해장'], constraints: ['자극적인 음식 OK'], foodTypes: ['밥', '찌개'] },
    { name: '북엇국', mealTimes: ['아침'], situations: ['해장', '가족 식사'], constraints: ['속 편한 음식', '가볍게'], foodTypes: ['국 / 탕'] },
    { name: '샌드위치', mealTimes: ['아침', '점심'], situations: ['혼자 간단히', '데이트'], constraints: ['시간 없음 (빠르게)', '가볍게'], foodTypes: ['간편식'] },
    { name: '파스타', mealTimes: ['점심', '저녁'], situations: ['데이트', '여유 있게'], constraints: [], foodTypes: ['면', '특식'] },
    { name: '제육볶음', mealTimes: ['점심', '저녁'], situations: ['든든하게 한 끼', '회식 / 모임'], constraints: ['자극적인 음식 OK', '집에서 해먹기'], foodTypes: ['밥', '볶음'] },
    { name: '돈까스', mealTimes: ['점심', '저녁'], situations: ['혼자 간단히', '든든하게 한 끼'], constraints: ['가성비'], foodTypes: ['밥', '튀김'] },
    { name: '치킨', mealTimes: ['저녁'], situations: ['야식', '회식 / 모임'], constraints: ['배달 가능'], foodTypes: ['튀김', '안주형'] },
    { name: '피자', mealTimes: ['저녁'], situations: ['야식', '가족 식사'], constraints: ['배달 가능'], foodTypes: ['특식'] },
    { name: '샐러드', mealTimes: ['아침', '점심'], situations: ['혼자 간단히'], constraints: ['가볍게', '시간 없음 (빠르게)'], foodTypes: ['간편식'] },
    { name: '라면', mealTimes: ['점심', '저녁', '야식'], situations: ['혼자 간단히', '해장'], constraints: ['시간 없음 (빠르게)', '가성비', '집에서 해먹기'], foodTypes: ['면'] },
    { name: '스테이크', mealTimes: ['저녁'], situations: ['데이트', '여유 있게', '가족 식사'], constraints: ['든든하게'], foodTypes: ['구이', '특식'] },
    { name: '삼겹살 구이', mealTimes: ['저녁'], situations: ['회식 / 모임', '가족 식사'], constraints: ['든든하게'], foodTypes: ['구이'] },
    { name: '갈비찜', mealTimes: ['저녁'], situations: ['가족 식사', '여유 있게'], constraints: ['든든하게'], foodTypes: ['찜'] },
  ];

  const uxPriorities = {
    '아침': ['국 / 탕', '밥', '간편식'],
    '점심': ['밥', '면', '볶음'],
    '저녁': ['구이', '찜', '술안주'],
  };

  function updateFoodTypeDisplay() {
    const selectedMealTimeInput = document.querySelector('input[name="mealTime"]:checked');
    if (!selectedMealTimeInput) return;

    const selectedMealTime = selectedMealTimeInput.value;
    const priorities = uxPriorities[selectedMealTime] || [];
    const foodTypeLabels = Array.from(foodTypeOptionsContainer.querySelectorAll('label'));

    foodTypeLabels.sort((a, b) => {
      const aValue = a.querySelector('input').value;
      const bValue = b.querySelector('input').value;
      const aPrio = priorities.indexOf(aValue);
      const bPrio = priorities.indexOf(bValue);

      if (aPrio === -1 && bPrio === -1) return 0; // Both not in priority list
      if (aPrio === -1) return 1; // a is not priority, b is
      if (bPrio === -1) return -1; // b is not priority, a is
      return aPrio - bPrio;
    });

    foodTypeLabels.forEach(label => foodTypeOptionsContainer.appendChild(label));
  }

  function setDefaultMealTime() {
    const currentHour = new Date().getHours();
    let mealTime = '저녁'; // Default
    if (currentHour >= 5 && currentHour < 10) mealTime = '아침';
    else if (currentHour >= 10 && currentHour < 16) mealTime = '점심';
    
    const input = document.querySelector(`input[name="mealTime"][value="${mealTime}"]`);
    if (input) {
      input.checked = true;
    }
    
    updateFoodTypeDisplay();
  }

  mealTimeOptionsContainer.addEventListener('change', updateFoodTypeDisplay);

  recommendButton.addEventListener('click', () => {
    const selectedMealTime = document.querySelector('input[name="mealTime"]:checked');
    const selectedSituation = document.querySelector('input[name="situation"]:checked');
    const selectedConstraints = Array.from(document.querySelectorAll('#constraint-options input:checked')).map(cb => cb.value);
    const selectedFoodType = document.querySelector('input[name="foodType"]:checked');

    if (!selectedMealTime || !selectedSituation || !selectedFoodType) {
      alert('식사 시간, 상황/목적, 음식 타입을 모두 선택해주세요!');
      return;
    }

    const meal = selectedMealTime.value;
    const situation = selectedSituation.value;
    const foodType = selectedFoodType.value;

    const filteredMenu = menuData.filter(item => {
      const mealMatch = item.mealTimes.includes(meal);
      const situationMatch = item.situations.includes(situation);
      const foodTypeMatch = item.foodTypes.includes(foodType);
      const constraintMatch = selectedConstraints.every(constraint => item.constraints.includes(constraint));
      
      return mealMatch && situationMatch && foodTypeMatch && constraintMatch;
    });

    if (filteredMenu.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMenu.length);
      resultText.textContent = `오늘은 '${filteredMenu[randomIndex].name}' 어떠세요?`;
    } else {
      resultText.textContent = '아쉽게도 모든 조건에 맞는 추천 메뉴가 없습니다. 다른 조합을 시도해보세요!';
    }
  });

  setDefaultMealTime();
});