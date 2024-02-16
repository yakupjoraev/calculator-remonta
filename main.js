function dateInputs() {
  // Получаем все элементы с атрибутом data-date-input
  const dateInputs = document.querySelectorAll('[data-mask-input]');

  if (!dateInputs) {
    return null
  }

  // Проходимся по каждому элементу и создаем для него экземпляр IMask
  dateInputs.forEach(dateInput => {
    const mask = IMask(dateInput, {
      mask: [
        {
          mask: '+{7}(000)000-00-00',
          startsWith: '7',
          prepare: value => (value[0] === '8' ? value.slice(1) : value)
        },
        {
          mask: '8(000)000-00-00',
          startsWith: '8',
        }
      ]
    });
  });

}
dateInputs();

// document.addEventListener('DOMContentLoaded', function () {
//   // Инициализация начальных значений
//   let squareMeterPrice = 9000; // Базовая стоимость за квадратный метр
//   let squareMeters = 45; // Начальная площадь
//   let totalCost = squareMeterPrice * squareMeters; // Начальная общая стоимость
//   let typePremises = document.getElementById('type-premises'); // Ссылка на элемент выбора типа помещения
//   let typeRepair = document.getElementById('type-repair'); // Ссылка на элемент выбора вида ремонта
//   let costWorkCheckbox = document.getElementById('cost-work'); // Ссылка на чекбокс "Стоимость работ"
//   let designProjectCheckbox = document.getElementById('design-project'); // Ссылка на чекбокс "Дизайн проект"
//   let draftMaterialsCheckbox = document.getElementById('draft-materials'); // Ссылка на чекбокс "Черновые материалы"
//   let finishingMaterialsCheckbox = document.getElementById('finishing-materials'); // Ссылка на чекбокс "Чистовые материалы"
//   let resultSum = document.querySelector('.calculator__result-sum span'); // Ссылка на элемент для отображения общей стоимости
//   let rangeInput = document.querySelector('.calculator__range-input'); // Ссылка на ползунок для выбора площади
//   let rangeSum = document.querySelector('.calculator__range .calculator__sum-input'); // Ссылка на элемент для отображения выбранной площади

//   // Устанавливаем начальное значение площади
//   updateSquareMeterValue(squareMeters);

//   // Устанавливаем начальное значение диапазона
//   rangeSum.textContent = squareMeters;

//   // Устанавливаем начальное состояние чекбокса "Стоимость работ"
//   costWorkCheckbox.checked = true;

//   // Обработчики событий
//   typePremises.addEventListener('change', function () {
//     updateTypePremises(this.value); // Обновление типа помещения при его изменении
//   });

//   typeRepair.addEventListener('change', function () {
//     updateTypeRepair(this.value); // Обновление вида ремонта при его изменении
//     if (this.value === "Черновой «White box»") {
//       finishingMaterialsCheckbox.checked = false; // Снимаем галочку "Чистовые материалы"
//       finishingMaterialsCheckbox.disabled = true; // Блокируем возможность выбора
//     } else {
//       finishingMaterialsCheckbox.disabled = false; // Разблокируем возможность выбора
//     }
//   });

//   costWorkCheckbox.addEventListener('change', function () {
//     this.checked = true; // Пункт «Стоимость работ» всегда должен быть включен
//     // updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Стоимость работ"
//   });

//   designProjectCheckbox.addEventListener('change', function () {
//     if (this.checked && typeRepair.value !== "Черновой «White box»") {
//       totalCost += 1500 * squareMeters;
//     } else if (!this.checked && typeRepair.value !== "Черновой «White box»") {
//       totalCost -= 1500 * squareMeters;
//     }
//     updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Дизайн проект"
//   });

//   draftMaterialsCheckbox.addEventListener('change', function () {
//     if (this.checked && typeRepair.value !== "Косметический") {
//       totalCost += 2000 * squareMeters;
//     } else if (!this.checked && typeRepair.value !== "Косметический") {
//       totalCost -= 2000 * squareMeters;
//     }
//     updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Черновые материалы"
//   });

//   finishingMaterialsCheckbox.addEventListener('change', function () {
//     if (this.checked) {
//       totalCost += 3500 * squareMeters;
//     } else {
//       totalCost -= 3500 * squareMeters;
//     }
//     updateTotalCost(); // Обновление общей стоимости при изменении состояния чекбокса "Чистовые материалы"
//   });

//   rangeInput.addEventListener('input', function () {
//     squareMeters = parseInt(this.value);
//     rangeSum.textContent = squareMeters;
//     rangeSum.value = squareMeters;
//     // updateSquareMeterValue(squareMeters);
//     //  updateTotalCost(); // Обновление общей стоимости при изменении значения площади
//   });

//   // Обработчик изменения значения в поле ввода
//   document.querySelector('.calculator__sum-input').addEventListener('input', function () {
//     let newValue = parseInt(this.value);
//     if (newValue >= parseInt(rangeInput.min) && newValue <= parseInt(rangeInput.max)) {
//       squareMeters = newValue;
//       rangeInput.value = newValue;
//       rangeSum.textContent = newValue;
//       updateTotalCost();
//     }
//   });

//   // Функции обновления значений

//   // Функция для обновления типа помещения
//   function updateTypePremises(value) {
//     totalCost = squareMeterPrice * squareMeters; // Сбрасываем общую стоимость перед пересчетом
//     switch (value) {
//       case "Вторичка":
//         totalCost += 500 * squareMeters;
//         break;
//       case "Частный дом":
//         totalCost += 500 * squareMeters;
//         break;
//       case "Офис":
//         totalCost -= 1000 * squareMeters;
//         break;
//     }
//     updateTotalCost(); // Обновление общей стоимости после изменения типа помещения
//   }

//   // Функция для обновления вида ремонта
//   function updateTypeRepair(value) {
//     totalCost = squareMeterPrice * squareMeters; // Сбрасываем общую стоимость перед пересчетом
//     if (!draftMaterialsCheckbox.checked) {
//       designProjectCheckbox.checked = false; // Если галочка "Черновые материалы" не выбрана, снимаем галочку "Дизайн проект"
//     }
//     switch (value) {
//       case "Капитальный «Под ключ»":
//         if (designProjectCheckbox.checked) {
//           totalCost += 1500 * squareMeters;
//         }
//         break;
//       case "Дизайнерский":
//         totalCost += 1500 * squareMeters;
//         designProjectCheckbox.checked = true; // Автоматически ставим галочку на "Дизайн проект"
//         break;
//       case "Черновой «White box»":
//         totalCost = 5500 * squareMeters;
//         finishingMaterialsCheckbox.checked = false; // Снимаем галочку "Чистовые материалы"
//         break;
//       case "Косметический":
//         totalCost = 4500 * squareMeters;
//         if (draftMaterialsCheckbox.checked) {
//           totalCost += 800 * squareMeters;
//         }
//         break;
//     }
//     updateTotalCost(); // Обновление общей стоимости после изменения вида ремонта
//   }

//   function formatNumberWithSpaces(number) {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//   }

//   // Функция для обновления общей стоимости
//   function updateTotalCost() {
//     resultSum.textContent = formatNumberWithSpaces(totalCost); // Обновление отображения общей стоимости
//   }

//   updateTotalCost();

//   // Функция для обновления значения площади
//   function updateSquareMeterValue(value) {
//     squareMeters = value;
//     totalCost = squareMeterPrice * squareMeters; // Пересчитываем общую стоимость
//     resultSum.textContent = formatNumberWithSpaces(totalCost); // Обновляем отображение общей стоимости с добавлением пробелов
//     document.querySelector('.calculator__sum-input').value = value; // Устанавливаем значение в поле ввода
//   }

//   // Обработчик события клика по кнопке "Рассчитать"
//   document.querySelector('.calculator__result-btn').addEventListener('click', function () {
//     updateTotalCost(); // Обновление общей стоимости при клике на кнопку "Рассчитать"
//     updateSquareMeterValue(squareMeters); // Обновляем значение площади
//   });

//   // Обработчик события клика по кнопке "Отправить"
//   document.querySelector('.calculator__btn').addEventListener('click', function (event) {
//     event.preventDefault(); // Предотвращаем отправку формы
//     sendFormData(); // Вызов функции для отправки данных формы
//   });



//   const form = document.getElementById('calculator-form');
//   form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const formData = {
//       squareMeterPrice: squareMeterPrice,
//       squareMeters: squareMeters,
//       totalCost: totalCost,
//       typePremises: typePremises.value,
//       typeRepair: typeRepair.value,
//       costWorkCheckbox: costWorkCheckbox.checked,
//       designProjectCheckbox: designProjectCheckbox.checked,
//       draftMaterialsCheckbox: draftMaterialsCheckbox.checked,
//       finishingMaterialsCheckbox: finishingMaterialsCheckbox.checked
//     };
//     console.log(formData);
//   });

//   // Функция форматирования числа с пробелами для разделения разрядов
//   function formatNumberWithSpaces(number) {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
//   }
// });




// Дожидаемся полной загрузки DOM, чтобы начать выполнение скрипта
document.addEventListener('DOMContentLoaded', function () {
  // Инициализация значений по умолчанию
  const defaultSquare = 45;
  const defaultTypePremises = 'Новостройка';
  const defaultTypeRepair = 'Капитальный «Под ключ»';
  const defaultIncludeCostWork = true;

  // Задаем начальные значения
  let square = defaultSquare;
  let typePremises = defaultTypePremises;
  let typeRepair = defaultTypeRepair;
  let includeCostWork = defaultIncludeCostWork;
  let includeDesignProject = false;
  let includeDraftMaterials = false;
  let includeFinishingMaterials = false;

  // Константы для стоимости ремонтов
  const prices = {
    'Капитальный «Под ключ»': 9000,
    'Дизайнерский': 9000,
    'Черновой «White box»': 5500,
    'Косметический': 4500
  };

  // Функция для обновления стоимости ремонта
  function updateTotalCost() {
    // Обнуляем предварительную стоимость перед пересчетом
    let totalCost = 0;

    // Рассчитываем стоимость в зависимости от параметров
    totalCost += square * prices[typeRepair];
    if (typePremises === 'Вторичка') {
      totalCost += 500 * square;
    } else if (typePremises === 'Частный дом') {
      totalCost += 500 * square;
    } else if (typePremises === 'Офис') {
      totalCost -= 1000 * square;
    }
    if (includeDesignProject) {
      if (typeRepair !== 'Черновой «White box»') {
        totalCost += 1500 * square;
      } else {
        totalCost += 800 * square;
      }
    }
    if (includeDraftMaterials) {
      if (typeRepair === 'Косметический') {
        totalCost += 800 * square;
      } else {
        totalCost += 2000 * square;
      }
    }
    if (includeFinishingMaterials) {
      totalCost += 3500 * square;
    }
    if (includeCostWork) {
      // Пункт «Стоимость работ» всегда включен
      totalCost += square * 0; // Здесь нужно указать базовую стоимость работ
    }

    // Обновляем отображение предварительной стоимости на странице
    const resultSum = document.querySelector('.calculator__result-sum span');
    resultSum.textContent = totalCost.toLocaleString();
  }

  // Обработчики событий для элементов управления

  // Селект для выбора вида ремонта
  const typeRepairSelect = document.querySelector('#type-repair');
  typeRepairSelect.addEventListener('change', function () {
    // Получаем выбранный вид ремонта
    typeRepair = typeRepairSelect.value;

    // Проверяем, нужно ли автоматически включать дизайн-проект
    if (typeRepair === 'Дизайнерский') {
      includeDesignProject = true;
      document.querySelector('#design-project').checked = true;
    } else {
      includeDesignProject = false;
      document.querySelector('#design-project').checked = false;
    }

    // Проверяем, выбран ли вариант "Черновой «White box»"
    if (typeRepair === 'Черновой «White box»') {
      // Делаем чекбокс "Чистовые материалы" недоступным для выбора
      includeFinishingMaterialsCheckbox.disabled = true;
      includeFinishingMaterialsCheckbox.checked = false; // Убираем галочку, если она была отмечена
    } else {
      // В остальных случаях делаем чекбокс доступным для выбора
      includeFinishingMaterialsCheckbox.disabled = false;
    }

    // Пересчитываем стоимость ремонта
    // updateTotalCost();
  });


  // Чекбокс для включения дизайн-проекта
  const includeDesignProjectCheckbox = document.querySelector('#design-project');
  includeDesignProjectCheckbox.addEventListener('change', function () {
    includeDesignProject = includeDesignProjectCheckbox.checked;
    // updateTotalCost();
  });

  // Чекбокс для включения черновых материалов
  const includeDraftMaterialsCheckbox = document.querySelector('#draft-materials');
  includeDraftMaterialsCheckbox.addEventListener('change', function () {
    includeDraftMaterials = includeDraftMaterialsCheckbox.checked;
    // updateTotalCost();
  });

  // Чекбокс для включения чистовых материалов
  const includeFinishingMaterialsCheckbox = document.querySelector('#finishing-materials');
  includeFinishingMaterialsCheckbox.addEventListener('change', function () {
    includeFinishingMaterials = includeFinishingMaterialsCheckbox.checked;
    // updateTotalCost();
  });

  // Чекбокс для включения стоимости работ (всегда включен)
  const includeCostWorkCheckbox = document.querySelector('#cost-work');
  includeCostWorkCheckbox.addEventListener('change', function () {
    includeCostWork = includeCostWorkCheckbox.checked;
    // updateTotalCost();
  });

  // Рендж для выбора площади
  const squareRange = document.querySelector('#square-range');
  squareRange.addEventListener('input', function () {
    square = parseInt(squareRange.value);
    document.querySelector('#square-input').value = square;
    // updateTotalCost();
  });

  // Ввод для выбора площади
  const squareInput = document.querySelector('#square-input');
  squareInput.addEventListener('input', function () {
    square = parseInt(squareInput.value);
    document.querySelector('#square-range').value = square;
    // updateTotalCost();
  });

  // Обработчик события клика на кнопку "Рассчитать"
  const calculateBtn = document.querySelector('.calculator__result-btn');
  calculateBtn.addEventListener('click', function () {
    updateTotalCost();
  });

  // Вызываем функцию для первоначального расчета при загрузке страницы
  // updateTotalCost();
});
