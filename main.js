document.addEventListener('DOMContentLoaded', function () {
  // Инициализация начальных значений
  let squareMeterPrice = 9000; // Базовая стоимость за квадратный метр
  let squareMeters = 45; // Начальная площадь
  let totalCost = squareMeterPrice * squareMeters; // Начальная общая стоимость
  let typePremises = document.getElementById('type-premises'); // Ссылка на элемент выбора типа помещения
  let typeRepair = document.getElementById('type-repair'); // Ссылка на элемент выбора вида ремонта
  let costWorkCheckbox = document.getElementById('cost-work'); // Ссылка на чекбокс "Стоимость работ"
  let designProjectCheckbox = document.getElementById('design-project'); // Ссылка на чекбокс "Дизайн проект"
  let draftMaterialsCheckbox = document.getElementById('draft-materials'); // Ссылка на чекбокс "Черновые материалы"
  let finishingMaterialsCheckbox = document.getElementById('finishing-materials'); // Ссылка на чекбокс "Чистовые материалы"
  let resultSum = document.querySelector('.calculator__result-sum span'); // Ссылка на элемент для отображения общей стоимости
  let rangeInput = document.querySelector('.calculator__range-input'); // Ссылка на ползунок для выбора площади
  let rangeSum = document.querySelector('.calculator__range .calculator__sum span'); // Ссылка на элемент для отображения выбранной площади

  // Устанавливаем начальное значение площади
  updateSquareMeterValue(squareMeters);

  // Устанавливаем начальное значение диапазона
  rangeSum.textContent = squareMeters;

  // Устанавливаем начальное состояние чекбокса "Стоимость работ"
  costWorkCheckbox.checked = true;

  // Обработчики событий
  typePremises.addEventListener('change', function () {
    updateTypePremises(this.value); // Обновление типа помещения при его изменении
  });

  typeRepair.addEventListener('change', function () {
    updateTypeRepair(this.value); // Обновление вида ремонта при его изменении
    if (this.value === "Черновой «White box»") {
      finishingMaterialsCheckbox.checked = false; // Снимаем галочку "Чистовые материалы"
      finishingMaterialsCheckbox.disabled = true; // Блокируем возможность выбора
    } else {
      finishingMaterialsCheckbox.disabled = false; // Разблокируем возможность выбора
    }
  });

  costWorkCheckbox.addEventListener('change', function () {
    this.checked = true; // Пункт «Стоимость работ» всегда должен быть включен
  });

  designProjectCheckbox.addEventListener('change', function () {
    if (this.checked && typeRepair.value !== "Черновой «White box»") {
      totalCost += 1500 * squareMeters;
    } else {
      totalCost -= 1500 * squareMeters;
    }
    updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Дизайн проект"
  });

  draftMaterialsCheckbox.addEventListener('change', function () {
    if (this.checked && typeRepair.value !== "Косметический") {
      totalCost += 2000 * squareMeters;
    } else {
      totalCost -= 2000 * squareMeters;
    }
    updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Черновые материалы"
  });

  finishingMaterialsCheckbox.addEventListener('change', function () {
    if (this.checked) {
      totalCost += 3500 * squareMeters;
    } else {
      totalCost -= 3500 * squareMeters;
    }
    updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Чистовые материалы"
  });

  rangeInput.addEventListener('input', function () {
    squareMeters = parseInt(this.value);
    rangeSum.textContent = squareMeters;
    updateSquareMeterValue(squareMeters);
    updateTotalCost(); // Обновление общей стоимости при изменении значения площади
  });

  // Функции обновления значений

  // Функция для обновления типа помещения
  function updateTypePremises(value) {
    totalCost = squareMeterPrice * squareMeters; // Сбрасываем общую стоимость перед пересчетом
    switch (value) {
      case "Вторичка":
        totalCost += 500 * squareMeters;
        break;
      case "Частный дом":
        totalCost += 500 * squareMeters;
        break;
      case "Офис":
        totalCost -= 1000 * squareMeters;
        break;
    }
    updateTotalCost(); // Обновление общей стоимости после изменения типа помещения
  }

  // Функция для обновления вида ремонта
  function updateTypeRepair(value) {
    totalCost = squareMeterPrice * squareMeters; // Сбрасываем общую стоимость перед пересчетом
    if (!draftMaterialsCheckbox.checked) {
      designProjectCheckbox.checked = false; // Если галочка "Черновые материалы" не выбрана, снимаем галочку "Дизайн проект"
    }
    switch (value) {
      case "Капитальный «Под ключ»":
        if (designProjectCheckbox.checked) {
          totalCost += 1500 * squareMeters;
        }
        break;
      case "Дизайнерский":
        totalCost += 1500 * squareMeters;
        designProjectCheckbox.checked = true; // Автоматически ставим галочку на "Дизайн проект"
        break;
      case "Черновой «White box»":
        totalCost = 5500 * squareMeters;
        finishingMaterialsCheckbox.checked = false; // Снимаем галочку "Чистовые материалы"
        break;
      case "Косметический":
        if (draftMaterialsCheckbox.checked) {
          totalCost += 800 * squareMeters;
        }
        break;
    }
    updateTotalCost(); // Обновление общей стоимости после изменения вида ремонта
  }

  // Функция для обновления общей стоимости
  function updateTotalCost() {
    resultSum.textContent = totalCost; // Обновление отображения общей стоимости
  }

  // Функция для обновления значения площади
  function updateSquareMeterValue(value) {
    squareMeters = value;
    totalCost = squareMeterPrice * squareMeters; // Пересчитываем общую стоимость
    resultSum.textContent = totalCost; // Обновляем отображение общей стоимости
  }


  const form = document.getElementById('calculator-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
      squareMeterPrice: squareMeterPrice,
      squareMeters: squareMeters,
      totalCost: totalCost,
      typePremises: typePremises.value,
      typeRepair: typeRepair.value,
      costWorkCheckbox: costWorkCheckbox.checked,
      designProjectCheckbox: designProjectCheckbox.checked,
      draftMaterialsCheckbox: draftMaterialsCheckbox.checked,
      finishingMaterialsCheckbox: finishingMaterialsCheckbox.checked
    };
    console.log(formData);
  });
});
