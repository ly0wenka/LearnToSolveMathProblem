function problem({ id, moduleId, topic, level, title, prompt, answer, variants = [], steps }) {
  return { id, moduleId, topic, level, title, prompt, answer, variants, steps };
}

function steps(step1, step2, step3) {
  return [
    { order: 1, ...step1 },
    { order: 2, ...step2 },
    { order: 3, ...step3 }
  ];
}

export const modules = [
  { id: "linear", title: "Лінійні рівняння", level: "Базовий", summary: "Ізоляція змінної, перенесення доданків і перевірка кореня.", outcomes: ["Розпізнає лінійні рівняння.", "Виконує рівносильні перетворення.", "Перевіряє відповідь підстановкою."] },
  { id: "quadratic", title: "Квадратні рівняння", level: "Базовий", summary: "Дискримінант, формули коренів і розклад на множники.", outcomes: ["Знаходить коефіцієнти.", "Обчислює дискримінант.", "Пояснює кількість коренів."] },
  { id: "functions", title: "Функції", level: "Середній", summary: "Нулі функції, область визначення та базовий аналіз графіка.", outcomes: ["Знаходить нуль функції.", "Працює з формулою y = f(x).", "Пов'язує графік і вираз."] },
  { id: "geometry", title: "Планіметрія", level: "Середній", summary: "Площі, периметри та базові геометричні моделі.", outcomes: ["Підбирає потрібну формулу.", "Рахує площу і периметр.", "Пояснює хід розв'язання."] },
  { id: "fractions", title: "Дроби", level: "Базовий", summary: "Скорочення, спільний знаменник і арифметика дробів.", outcomes: ["Скорочує дріб.", "Додає та віднімає дроби.", "Пояснює спільний знаменник."] },
  { id: "proportions", title: "Пропорції", level: "Базовий", summary: "Основна властивість пропорції та задачі на невідомий член.", outcomes: ["Складає пропорцію.", "Користується правилом добутків.", "Знаходить невідомий член."] },
  { id: "percentages", title: "Відсотки", level: "Базовий", summary: "Частина від числа, знижка, приріст і зменшення.", outcomes: ["Рахує відсоток від числа.", "Знаходить нову ціну.", "Інтерпретує результат."] },
  { id: "systems", title: "Системи рівнянь", level: "Середній", summary: "Підстановка і додавання для двох змінних.", outcomes: ["Працює з двома змінними.", "Обирає метод розв'язання.", "Перевіряє пару значень."] },
  { id: "inequalities", title: "Нерівності", level: "Середній", summary: "Лінійні нерівності та інтервали.", outcomes: ["Перетворює нерівність.", "Записує відповідь інтервалом.", "Пояснює зміну знака."] },
  { id: "sequences", title: "Послідовності", level: "Середній", summary: "Арифметична та геометрична прогресії.", outcomes: ["Знаходить різницю або знаменник.", "Обчислює n-ий член.", "Працює з формулами."] },
  { id: "powers", title: "Степені та корені", level: "Середній", summary: "Властивості степенів та спрощення коренів.", outcomes: ["Користується властивостями степеня.", "Спрощує корені.", "Пояснює перетворення."] },
  { id: "logarithms", title: "Логарифми", level: "Поглиблений", summary: "Основні тотожності та обчислення логарифмів.", outcomes: ["Читає запис логарифма.", "Застосовує тотожність.", "Розв'язує базові приклади."] },
  { id: "trigonometry", title: "Тригонометрія", level: "Поглиблений", summary: "sin, cos, tg для стандартних кутів.", outcomes: ["Пам'ятає табличні значення.", "Працює з кутами.", "Обчислює вирази."] },
  { id: "stereometry", title: "Стереометрія", level: "Поглиблений", summary: "Об'єми тіл і площі поверхонь.", outcomes: ["Розрізняє геометричні тіла.", "Обчислює об'єм.", "Пояснює вибір формули."] },
  { id: "combinatorics", title: "Комбінаторика", level: "Поглиблений", summary: "Перестановки, комбінації та підрахунок варіантів.", outcomes: ["Застосовує правило добутку.", "Рахує варіанти вибору.", "Оформлює міркування."] },
  { id: "probability", title: "Ймовірність", level: "Поглиблений", summary: "Класична ймовірність у простих схемах.", outcomes: ["Виділяє простір подій.", "Рахує сприятливі випадки.", "Обчислює ймовірність дробом."] },
  { id: "derivatives", title: "Похідна", level: "Поглиблений", summary: "Похідні елементарних функцій.", outcomes: ["Розуміє сенс похідної.", "Диференціює прості вирази.", "Обчислює значення в точці."] },
  { id: "integrals", title: "Інтеграли", level: "Поглиблений", summary: "Первісна і прості визначені інтеграли.", outcomes: ["Знаходить базову первісну.", "Працює з межами.", "Пояснює результат."] },
  { id: "vectors", title: "Вектори", level: "Поглиблений", summary: "Координати, довжина і скалярний добуток.", outcomes: ["Знаходить координати.", "Обчислює довжину.", "Використовує формулу добутку."] },
  { id: "exam", title: "Підсумкова практика", level: "Адаптивний", summary: "Комбіновані задачі для повторення тем.", outcomes: ["Поєднує кілька навичок.", "Працює до кінця без втрати логіки.", "Оцінює власний прогрес."] }
];

export const problems = [
  problem({ id: "linear-1", moduleId: "linear", topic: "Лінійні рівняння", level: "Легкий", title: "Знайдіть x", prompt: "2x + 7 = 19", answer: "x = 6", variants: ["6", "x=6"], steps: steps(
    { title: "Перенесіть число", description: "Відніміть 7 з обох частин і отримаєте 2x = 12.", tip: "Однакова дія виконується зліва і справа." },
    { title: "Поділіть на 2", description: "Після ділення маємо x = 6.", tip: "Так ізолюємо змінну." },
    { title: "Перевірте", description: "2 · 6 + 7 = 19.", tip: "Підстановка підтверджує результат." }
  ) }),
  problem({ id: "linear-2", moduleId: "linear", topic: "Лінійні рівняння", level: "Легкий", title: "Розв'яжіть рівняння", prompt: "5x - 10 = 0", answer: "x = 2", variants: ["2", "x=2"], steps: steps(
    { title: "Перенесіть число", description: "Додайте 10 до обох частин: 5x = 10.", tip: "Позбудьтеся вільного члена." },
    { title: "Поділіть на 5", description: "Отримуємо x = 2.", tip: "Ділимо обидві частини." },
    { title: "Перевірте", description: "5 · 2 - 10 = 0.", tip: "Підстановка завершує розв'язання." }
  ) }),
  problem({ id: "linear-3", moduleId: "linear", topic: "Лінійні рівняння", level: "Середній", title: "Знайдіть значення x", prompt: "3x + 4 = 25", answer: "x = 7", variants: ["7", "x=7"], steps: steps(
    { title: "Відніміть 4", description: "3x = 21.", tip: "Переносьте вільний член." },
    { title: "Поділіть на 3", description: "x = 7.", tip: "Коефіцієнт при x прибираємо діленням." },
    { title: "Перевірте", description: "3 · 7 + 4 = 25.", tip: "Результат має збігтися з правою частиною." }
  ) }),

  problem({ id: "quadratic-1", moduleId: "quadratic", topic: "Квадратні рівняння", level: "Середній", title: "Знайдіть корені", prompt: "x² - 5x + 6 = 0", answer: "x1 = 2, x2 = 3", variants: ["2,3", "2 і 3"], steps: steps(
    { title: "Знайдіть коефіцієнти", description: "a = 1, b = -5, c = 6.", tip: "Це потрібно для дискримінанта." },
    { title: "Обчисліть D", description: "D = 25 - 24 = 1.", tip: "D > 0 означає два корені." },
    { title: "Запишіть корені", description: "Корені рівняння: 2 і 3.", tip: "Можна перевірити підстановкою." }
  ) }),
  problem({ id: "quadratic-2", moduleId: "quadratic", topic: "Квадратні рівняння", level: "Середній", title: "Розкладіть і розв'яжіть", prompt: "x² - 9 = 0", answer: "x1 = -3, x2 = 3", variants: ["-3,3", "3,-3"], steps: steps(
    { title: "Розпізнайте різницю квадратів", description: "x² - 9 = (x - 3)(x + 3).", tip: "9 = 3²." },
    { title: "Прирівняйте множники до нуля", description: "x - 3 = 0 або x + 3 = 0.", tip: "Добуток дорівнює нулю, якщо один із множників нуль." },
    { title: "Запишіть корені", description: "x = 3 і x = -3.", tip: "Обидва значення підходять." }
  ) }),
  problem({ id: "quadratic-3", moduleId: "quadratic", topic: "Квадратні рівняння", level: "Середній", title: "Розв'яжіть рівняння", prompt: "x² - 4x = 0", answer: "x1 = 0, x2 = 4", variants: ["0,4", "4,0"], steps: steps(
    { title: "Винесіть спільний множник", description: "x² - 4x = x(x - 4).", tip: "Спільний множник тут x." },
    { title: "Розбийте на два випадки", description: "x = 0 або x - 4 = 0.", tip: "Кожен множник може дорівнювати нулю." },
    { title: "Запишіть корені", description: "Отже, корені: 0 і 4.", tip: "Перевірка покаже, що обидва корені правильні." }
  ) }),

  problem({ id: "functions-1", moduleId: "functions", topic: "Функції", level: "Легкий", title: "Знайдіть нуль функції", prompt: "3x - 9 = 0", answer: "x = 3", variants: ["3", "x=3"], steps: steps(
    { title: "Прирівняйте до нуля", description: "Маємо вже рівняння 3x - 9 = 0.", tip: "Нуль функції — це значення x, де y = 0." },
    { title: "Перенесіть число", description: "3x = 9.", tip: "Додаємо 9 до обох частин." },
    { title: "Знайдіть x", description: "x = 3.", tip: "Ділимо на 3." }
  ) }),
  problem({ id: "functions-2", moduleId: "functions", topic: "Функції", level: "Легкий", title: "Обчисліть значення функції", prompt: "y = 2x + 1, x = 4", answer: "9", variants: ["y = 9"], steps: steps(
    { title: "Підставте x", description: "У формулу y = 2x + 1 підставляємо x = 4.", tip: "Замість x пишемо 4." },
    { title: "Обчисліть добуток", description: "2 · 4 = 8.", tip: "Спершу виконайте множення." },
    { title: "Додайте 1", description: "8 + 1 = 9.", tip: "Отже, значення функції дорівнює 9." }
  ) }),
  problem({ id: "functions-3", moduleId: "functions", topic: "Функції", level: "Середній", title: "Знайдіть область визначення", prompt: "y = 1/x", answer: "x ≠ 0", variants: ["x!=0", "x not 0"], steps: steps(
    { title: "Знайдіть обмеження", description: "У знаменнику не може бути нуля.", tip: "Ділення на нуль неможливе." },
    { title: "Перевірте знаменник", description: "У виразі знаменник — це x.", tip: "Отже, x не повинен дорівнювати 0." },
    { title: "Запишіть відповідь", description: "Область визначення: усі x, крім 0.", tip: "Короткий запис: x ≠ 0." }
  ) }),

  problem({ id: "geometry-1", moduleId: "geometry", topic: "Планіметрія", level: "Легкий", title: "Площа прямокутника", prompt: "5 * 8", answer: "40", variants: ["40 см2", "40 см^2"], steps: steps(
    { title: "Запишіть сторони", description: "Сторони прямокутника: 5 і 8.", tip: "Дві сторони достатні для площі." },
    { title: "Застосуйте формулу", description: "S = a · b = 5 · 8.", tip: "Площа прямокутника — добуток сторін." },
    { title: "Обчисліть", description: "S = 40.", tip: "За потреби додайте см²." }
  ) }),
  problem({ id: "geometry-2", moduleId: "geometry", topic: "Планіметрія", level: "Легкий", title: "Периметр квадрата", prompt: "a = 6", answer: "24", variants: ["24 см"], steps: steps(
    { title: "Пригадайте формулу", description: "P = 4a.", tip: "У квадрата чотири рівні сторони." },
    { title: "Підставте сторону", description: "P = 4 · 6.", tip: "Помножте довжину сторони на 4." },
    { title: "Обчисліть", description: "P = 24.", tip: "За потреби запишіть одиниці." }
  ) }),
  problem({ id: "geometry-3", moduleId: "geometry", topic: "Планіметрія", level: "Середній", title: "Площа трикутника", prompt: "a = 10, h = 6", answer: "30", variants: ["30 см2", "30 см^2"], steps: steps(
    { title: "Пригадайте формулу", description: "S = 1/2 · a · h.", tip: "Потрібні основа і висота." },
    { title: "Підставте значення", description: "S = 1/2 · 10 · 6.", tip: "Можна спершу перемножити 10 і 6." },
    { title: "Обчисліть", description: "S = 30.", tip: "Половина від 60 дорівнює 30." }
  ) }),

  problem({ id: "fractions-1", moduleId: "fractions", topic: "Дроби", level: "Легкий", title: "Скоротіть дріб", prompt: "12/18", answer: "2/3", variants: ["2 / 3"], steps: steps(
    { title: "Знайдіть НСД", description: "12 і 18 діляться на 6.", tip: "Обирайте найбільший спільний дільник." },
    { title: "Поділіть чисельник і знаменник", description: "12 : 6 = 2, 18 : 6 = 3.", tip: "Скорочуйте обидві частини." },
    { title: "Запишіть результат", description: "Отримаємо 2/3.", tip: "Перевірте, чи можна скоротити ще." }
  ) }),
  problem({ id: "fractions-2", moduleId: "fractions", topic: "Дроби", level: "Легкий", title: "Додайте дроби", prompt: "1/4 + 1/2", answer: "3/4", variants: ["0.75"], steps: steps(
    { title: "Зведіть до спільного знаменника", description: "1/2 = 2/4.", tip: "Спільний знаменник тут 4." },
    { title: "Додайте чисельники", description: "1/4 + 2/4 = 3/4.", tip: "Знаменник лишається тим самим." },
    { title: "Запишіть відповідь", description: "Отримуємо 3/4.", tip: "Скорочення вже не потрібне." }
  ) }),
  problem({ id: "fractions-3", moduleId: "fractions", topic: "Дроби", level: "Легкий", title: "Помножте дроби", prompt: "2/3 * 3/5", answer: "2/5", variants: ["2 / 5"], steps: steps(
    { title: "Перемножте чисельники", description: "2 · 3 = 6.", tip: "Чисельники множаться окремо." },
    { title: "Перемножте знаменники", description: "3 · 5 = 15.", tip: "Знаменники теж множаться окремо." },
    { title: "Скоротіть дріб", description: "6/15 = 2/5.", tip: "Поділіть чисельник і знаменник на 3." }
  ) }),

  problem({ id: "proportions-1", moduleId: "proportions", topic: "Пропорції", level: "Легкий", title: "Знайдіть x", prompt: "x/4 = 6/8", answer: "x = 3", variants: ["3", "x=3"], steps: steps(
    { title: "Запишіть пропорцію добутками", description: "8x = 4 · 6.", tip: "Крайні дорівнюють добутку середніх." },
    { title: "Обчисліть праву частину", description: "8x = 24.", tip: "Перемножте 4 і 6." },
    { title: "Поділіть на 8", description: "x = 3.", tip: "Отримуємо шукане значення." }
  ) }),
  problem({ id: "proportions-2", moduleId: "proportions", topic: "Пропорції", level: "Легкий", title: "Розв'яжіть пропорцію", prompt: "3/5 = x/20", answer: "x = 12", variants: ["12", "x=12"], steps: steps(
    { title: "Запишіть добутки", description: "5x = 3 · 20.", tip: "Перемножуємо навхрест." },
    { title: "Обчисліть", description: "5x = 60.", tip: "Спочатку знайдіть числовий добуток." },
    { title: "Знайдіть x", description: "x = 12.", tip: "Поділіть обидві частини на 5." }
  ) }),
  problem({ id: "proportions-3", moduleId: "proportions", topic: "Пропорції", level: "Середній", title: "Знайдіть невідомий член", prompt: "7/x = 14/8", answer: "x = 4", variants: ["4", "x=4"], steps: steps(
    { title: "Перемножте навхрест", description: "14x = 7 · 8.", tip: "Використайте основну властивість пропорції." },
    { title: "Спростіть рівняння", description: "14x = 56.", tip: "Обчисліть добуток справа." },
    { title: "Поділіть на 14", description: "x = 4.", tip: "Отримуємо результат." }
  ) }),

  problem({ id: "percentages-1", moduleId: "percentages", topic: "Відсотки", level: "Легкий", title: "Знайдіть 25% від 80", prompt: "25% від 80", answer: "20", variants: ["20.0"], steps: steps(
    { title: "Перетворіть відсотки", description: "25% = 0.25.", tip: "Поділіть на 100." },
    { title: "Помножте на число", description: "0.25 · 80 = 20.", tip: "Так знаходимо частину від числа." },
    { title: "Запишіть результат", description: "Відповідь: 20.", tip: "Переконайтесь, що число менше за 80." }
  ) }),
  problem({ id: "percentages-2", moduleId: "percentages", topic: "Відсотки", level: "Легкий", title: "Знижка 10%", prompt: "100 зі знижкою 10%", answer: "90", variants: [], steps: steps(
    { title: "Знайдіть суму знижки", description: "10% від 100 дорівнює 10.", tip: "10% = 0.1." },
    { title: "Відніміть знижку", description: "100 - 10 = 90.", tip: "Нова ціна менша за початкову." },
    { title: "Запишіть нову ціну", description: "Після знижки маємо 90.", tip: "Це фінальний результат." }
  ) }),
  problem({ id: "percentages-3", moduleId: "percentages", topic: "Відсотки", level: "Середній", title: "Знайдіть 15% від 200", prompt: "15% від 200", answer: "30", variants: [], steps: steps(
    { title: "Перетворіть 15%", description: "15% = 0.15.", tip: "Відсотки переводимо у десятковий дріб." },
    { title: "Помножте", description: "0.15 · 200 = 30.", tip: "Частину від числа рахуємо множенням." },
    { title: "Запишіть відповідь", description: "Отримуємо 30.", tip: "Перевірте обчислення усно." }
  ) }),

  problem({ id: "systems-1", moduleId: "systems", topic: "Системи рівнянь", level: "Середній", title: "Розв'яжіть систему", prompt: "x + y = 7, x - y = 1", answer: "x = 4, y = 3", variants: ["4,3"], steps: steps(
    { title: "Додайте рівняння", description: "2x = 8.", tip: "y скорочується." },
    { title: "Знайдіть x", description: "x = 4.", tip: "Поділіть на 2." },
    { title: "Знайдіть y", description: "Підставте x = 4 і отримаєте y = 3.", tip: "Перевірте пару значень." }
  ) }),
  problem({ id: "systems-2", moduleId: "systems", topic: "Системи рівнянь", level: "Середній", title: "Підстановка в систему", prompt: "x = y + 2, x + y = 10", answer: "x = 6, y = 4", variants: ["6,4"], steps: steps(
    { title: "Підставте x", description: "(y + 2) + y = 10.", tip: "Замість x підставляємо вираз." },
    { title: "Знайдіть y", description: "2y + 2 = 10, отже y = 4.", tip: "Спочатку відніміть 2." },
    { title: "Знайдіть x", description: "x = y + 2 = 6.", tip: "Підставте знайдене y." }
  ) }),
  problem({ id: "systems-3", moduleId: "systems", topic: "Системи рівнянь", level: "Середній", title: "Розв'яжіть систему", prompt: "2x + y = 9, x - y = 0", answer: "x = 3, y = 3", variants: ["3,3"], steps: steps(
    { title: "Використайте друге рівняння", description: "З x - y = 0 маємо x = y.", tip: "Одна змінна виражається через іншу." },
    { title: "Підставте в перше", description: "2y + y = 9, тобто 3y = 9.", tip: "Отримуємо рівняння з однією змінною." },
    { title: "Знайдіть обидві змінні", description: "y = 3 і x = 3.", tip: "Перевірте у двох рівняннях." }
  ) }),

  problem({ id: "inequalities-1", moduleId: "inequalities", topic: "Нерівності", level: "Середній", title: "Розв'яжіть нерівність", prompt: "3x - 6 > 9", answer: "x > 5", variants: ["x>5"], steps: steps(
    { title: "Перенесіть число", description: "3x > 15.", tip: "Додайте 6 до обох частин." },
    { title: "Поділіть на 3", description: "x > 5.", tip: "Знак не змінюється." },
    { title: "Запишіть відповідь", description: "Усі x, більші за 5.", tip: "Можна записати інтервалом." }
  ) }),
  problem({ id: "inequalities-2", moduleId: "inequalities", topic: "Нерівності", level: "Середній", title: "Розв'яжіть нерівність", prompt: "2x + 1 ≤ 7", answer: "x ≤ 3", variants: ["x<=3"], steps: steps(
    { title: "Відніміть 1", description: "2x ≤ 6.", tip: "Переносимо вільний член." },
    { title: "Поділіть на 2", description: "x ≤ 3.", tip: "Ділення на додатне число знак не змінює." },
    { title: "Запишіть множину", description: "Підходять усі x, не більші за 3.", tip: "За бажанням запишіть інтервал." }
  ) }),
  problem({ id: "inequalities-3", moduleId: "inequalities", topic: "Нерівності", level: "Середній", title: "Нерівність з від'ємним коефіцієнтом", prompt: "-2x > 8", answer: "x < -4", variants: ["x<-4"], steps: steps(
    { title: "Поділіть на -2", description: "x < -4.", tip: "При діленні на від'ємне знак змінюється." },
    { title: "Поясніть зміну знака", description: "Нерівність змінює напрям через від'ємний дільник.", tip: "Це ключове правило." },
    { title: "Запишіть відповідь", description: "Усі x, менші за -4.", tip: "Перевірте тестовим числом." }
  ) }),

  problem({ id: "sequences-1", moduleId: "sequences", topic: "Послідовності", level: "Середній", title: "П'ятий член арифметичної прогресії", prompt: "a1 = 2, d = 3, n = 5", answer: "14", variants: [], steps: steps(
    { title: "Згадайте формулу", description: "an = a1 + (n - 1)d.", tip: "Це формула арифметичної прогресії." },
    { title: "Підставте дані", description: "a5 = 2 + 4 · 3.", tip: "n - 1 = 4." },
    { title: "Обчисліть", description: "a5 = 14.", tip: "Додайте 2 і 12." }
  ) }),
  problem({ id: "sequences-2", moduleId: "sequences", topic: "Послідовності", level: "Середній", title: "Знайдіть різницю прогресії", prompt: "a1 = 4, a3 = 10", answer: "3", variants: [], steps: steps(
    { title: "Запишіть формулу", description: "a3 = a1 + 2d.", tip: "Для третього члена n - 1 = 2." },
    { title: "Підставте значення", description: "10 = 4 + 2d.", tip: "Отримуємо лінійне рівняння." },
    { title: "Знайдіть d", description: "2d = 6, отже d = 3.", tip: "Поділіть на 2." }
  ) }),
  problem({ id: "sequences-3", moduleId: "sequences", topic: "Послідовності", level: "Середній", title: "Четвертий член геометричної прогресії", prompt: "b1 = 2, q = 3, n = 4", answer: "54", variants: [], steps: steps(
    { title: "Згадайте формулу", description: "bn = b1 · q^(n-1).", tip: "Це формула геометричної прогресії." },
    { title: "Підставте значення", description: "b4 = 2 · 3^3.", tip: "n - 1 = 3." },
    { title: "Обчисліть", description: "b4 = 2 · 27 = 54.", tip: "Спершу знайдіть 3^3." }
  ) }),

  problem({ id: "powers-1", moduleId: "powers", topic: "Степені та корені", level: "Середній", title: "Спростіть вираз", prompt: "2^3 * 2^2", answer: "32", variants: ["2^5"], steps: steps(
    { title: "Додайте показники", description: "2^3 · 2^2 = 2^(3+2).", tip: "Однакова основа — додаємо показники." },
    { title: "Отримайте степінь", description: "2^5.", tip: "3 + 2 = 5." },
    { title: "Обчисліть", description: "2^5 = 32.", tip: "Можна лишити і степеневий запис." }
  ) }),
  problem({ id: "powers-2", moduleId: "powers", topic: "Степені та корені", level: "Середній", title: "Обчисліть корінь", prompt: "√49", answer: "7", variants: [], steps: steps(
    { title: "Згадайте означення", description: "√49 — це число, квадрат якого дорівнює 49.", tip: "Шукаємо додатне число." },
    { title: "Підберіть число", description: "7² = 49.", tip: "Перевірте таблицю квадратів." },
    { title: "Запишіть відповідь", description: "√49 = 7.", tip: "Головне значення кореня додатне." }
  ) }),
  problem({ id: "powers-3", moduleId: "powers", topic: "Степені та корені", level: "Середній", title: "Спростіть корінь", prompt: "√(16 · 9)", answer: "12", variants: [], steps: steps(
    { title: "Обчисліть добуток", description: "16 · 9 = 144.", tip: "Спершу спростіть підкореневий вираз." },
    { title: "Візьміть корінь", description: "√144 = 12.", tip: "Перевірте квадрат 12." },
    { title: "Запишіть результат", description: "Відповідь: 12.", tip: "Можна також скористатися властивістю √a·√b." }
  ) }),

  problem({ id: "logarithms-1", moduleId: "logarithms", topic: "Логарифми", level: "Поглиблений", title: "Обчисліть логарифм", prompt: "log2(8)", answer: "3", variants: [], steps: steps(
    { title: "Перейдіть до степеня", description: "Потрібно знайти x з рівності 2^x = 8.", tip: "Це означення логарифма." },
    { title: "Порівняйте зі степенем", description: "8 = 2^3.", tip: "8 — степінь двійки." },
    { title: "Запишіть x", description: "x = 3.", tip: "Отже, log2(8) = 3." }
  ) }),
  problem({ id: "logarithms-2", moduleId: "logarithms", topic: "Логарифми", level: "Поглиблений", title: "Обчисліть логарифм", prompt: "log10(100)", answer: "2", variants: [], steps: steps(
    { title: "Запишіть степінь", description: "10^x = 100.", tip: "Основа тут 10." },
    { title: "Визначте степінь", description: "100 = 10².", tip: "Дві десятки в добутку." },
    { title: "Запишіть результат", description: "x = 2.", tip: "Тому логарифм дорівнює 2." }
  ) }),
  problem({ id: "logarithms-3", moduleId: "logarithms", topic: "Логарифми", level: "Поглиблений", title: "Використайте тотожність", prompt: "log3(1)", answer: "0", variants: [], steps: steps(
    { title: "Згадайте властивість", description: "Для будь-якої основи a > 0, a ≠ 1 маємо loga(1) = 0.", tip: "Бо a^0 = 1." },
    { title: "Підставте основу", description: "Отже, log3(1) = 0.", tip: "Це стандартна тотожність." },
    { title: "Запишіть відповідь", description: "Відповідь: 0.", tip: "Перевірка: 3^0 = 1." }
  ) }),

  problem({ id: "trigonometry-1", moduleId: "trigonometry", topic: "Тригонометрія", level: "Поглиблений", title: "Значення синуса", prompt: "sin 30°", answer: "1/2", variants: ["0.5"], steps: steps(
    { title: "Пригадайте таблицю", description: "sin 30° = 1/2.", tip: "Це базове табличне значення." },
    { title: "За потреби перетворіть", description: "1/2 = 0.5.", tip: "Десятковий дріб також коректний." },
    { title: "Запишіть відповідь", description: "Відповідь: 1/2.", tip: "Часто лишають саме дріб." }
  ) }),
  problem({ id: "trigonometry-2", moduleId: "trigonometry", topic: "Тригонометрія", level: "Поглиблений", title: "Значення косинуса", prompt: "cos 60°", answer: "1/2", variants: ["0.5"], steps: steps(
    { title: "Згадайте табличне значення", description: "cos 60° = 1/2.", tip: "Це одна з найуживаніших формул." },
    { title: "Порівняйте з десятковим записом", description: "1/2 = 0.5.", tip: "Обидва записи правильні." },
    { title: "Запишіть відповідь", description: "Відповідь: 1/2.", tip: "Найзручніше лишити дріб." }
  ) }),
  problem({ id: "trigonometry-3", moduleId: "trigonometry", topic: "Тригонометрія", level: "Поглиблений", title: "Значення тангенса", prompt: "tg 45°", answer: "1", variants: [], steps: steps(
    { title: "Пригадайте значення", description: "tg 45° = 1.", tip: "Це стандартний кут." },
    { title: "Поясніть геометрично", description: "У прямокутному рівнобедреному трикутнику катети рівні.", tip: "Тангенс — відношення рівних катетів." },
    { title: "Запишіть відповідь", description: "Відповідь: 1.", tip: "Результат без дробу." }
  ) }),

  problem({ id: "stereometry-1", moduleId: "stereometry", topic: "Стереометрія", level: "Поглиблений", title: "Об'єм куба", prompt: "a = 3", answer: "27", variants: ["27 см3"], steps: steps(
    { title: "Згадайте формулу", description: "V = a³.", tip: "Для куба всі ребра однакові." },
    { title: "Підставте значення", description: "V = 3³.", tip: "Треба піднести до третього степеня." },
    { title: "Обчисліть", description: "V = 27.", tip: "За потреби додайте одиниці." }
  ) }),
  problem({ id: "stereometry-2", moduleId: "stereometry", topic: "Стереометрія", level: "Поглиблений", title: "Об'єм прямокутного паралелепіпеда", prompt: "a = 2, b = 3, c = 4", answer: "24", variants: [], steps: steps(
    { title: "Пригадайте формулу", description: "V = abc.", tip: "Об'єм дорівнює добутку трьох вимірів." },
    { title: "Підставте значення", description: "V = 2 · 3 · 4.", tip: "Послідовно перемножте числа." },
    { title: "Обчисліть", description: "V = 24.", tip: "Отримали об'єм тіла." }
  ) }),
  problem({ id: "stereometry-3", moduleId: "stereometry", topic: "Стереометрія", level: "Поглиблений", title: "Площа поверхні куба", prompt: "a = 5", answer: "150", variants: [], steps: steps(
    { title: "Запишіть формулу", description: "S = 6a².", tip: "У куба шість рівних граней." },
    { title: "Підставте a", description: "S = 6 · 25.", tip: "5² = 25." },
    { title: "Обчисліть", description: "S = 150.", tip: "Маємо повну площу поверхні." }
  ) }),

  problem({ id: "combinatorics-1", moduleId: "combinatorics", topic: "Комбінаторика", level: "Поглиблений", title: "Двоцифрові числа без повторень", prompt: "цифри 1, 2, 3", answer: "6", variants: [], steps: steps(
    { title: "Обираємо першу цифру", description: "Маємо 3 варіанти.", tip: "1, 2 або 3." },
    { title: "Обираємо другу цифру", description: "Після першого вибору лишається 2 варіанти.", tip: "Повторювати не можна." },
    { title: "Застосуйте правило добутку", description: "3 · 2 = 6.", tip: "Отже, маємо 6 чисел." }
  ) }),
  problem({ id: "combinatorics-2", moduleId: "combinatorics", topic: "Комбінаторика", level: "Поглиблений", title: "Скільки способів вибрати 1 з 5", prompt: "вибір одного елемента з 5", answer: "5", variants: [], steps: steps(
    { title: "Проаналізуйте умову", description: "Обираємо лише один елемент.", tip: "Кожен елемент — окремий варіант." },
    { title: "Порахуйте варіанти", description: "Можна вибрати будь-який із 5 елементів.", tip: "Ніяких додаткових обмежень немає." },
    { title: "Запишіть відповідь", description: "Отже, способів 5.", tip: "Це найпростіший комбінаторний випадок." }
  ) }),
  problem({ id: "combinatorics-3", moduleId: "combinatorics", topic: "Комбінаторика", level: "Поглиблений", title: "Паролі з двох літер", prompt: "A, B, C з повтореннями", answer: "9", variants: [], steps: steps(
    { title: "Перша позиція", description: "Для першої літери маємо 3 варіанти.", tip: "A, B або C." },
    { title: "Друга позиція", description: "З повтореннями знову маємо 3 варіанти.", tip: "Повторення дозволене." },
    { title: "Застосуйте правило добутку", description: "3 · 3 = 9.", tip: "Отримуємо 9 різних паролів." }
  ) }),

  problem({ id: "probability-1", moduleId: "probability", topic: "Ймовірність", level: "Поглиблений", title: "Парне число на кубику", prompt: "гральний кубик", answer: "1/2", variants: ["0.5", "3/6"], steps: steps(
    { title: "Визначте простір подій", description: "Є 6 результатів: 1, 2, 3, 4, 5, 6.", tip: "Усі рівноймовірні." },
    { title: "Порахуйте сприятливі випадки", description: "Парні: 2, 4, 6.", tip: "Сприятливих результатів 3." },
    { title: "Складіть ймовірність", description: "3/6 = 1/2.", tip: "Скоротіть дріб." }
  ) }),
  problem({ id: "probability-2", moduleId: "probability", topic: "Ймовірність", level: "Поглиблений", title: "Ймовірність витягнути червону кульку", prompt: "2 червоні, 3 сині", answer: "2/5", variants: ["0.4"], steps: steps(
    { title: "Порахуйте всі кульки", description: "Усього 5 кульок.", tip: "2 + 3 = 5." },
    { title: "Порахуйте сприятливі", description: "Червоних кульок 2.", tip: "Це чисельник дробу." },
    { title: "Складіть дріб", description: "P = 2/5.", tip: "Можна також записати 0.4." }
  ) }),
  problem({ id: "probability-3", moduleId: "probability", topic: "Ймовірність", level: "Поглиблений", title: "Ймовірність числа більше 4", prompt: "гральний кубик", answer: "1/3", variants: ["2/6"], steps: steps(
    { title: "Запишіть усі результати", description: "На кубику можливі 1–6.", tip: "Усього 6 випадків." },
    { title: "Виділіть сприятливі", description: "Більші за 4: це 5 і 6.", tip: "Маємо 2 сприятливі випадки." },
    { title: "Обчисліть ймовірність", description: "P = 2/6 = 1/3.", tip: "Скоротіть дріб." }
  ) }),

  problem({ id: "derivatives-1", moduleId: "derivatives", topic: "Похідна", level: "Поглиблений", title: "Знайдіть похідну", prompt: "f(x) = x^2", answer: "2x", variants: ["f'(x)=2x"], steps: steps(
    { title: "Згадайте правило", description: "Похідна x^n дорівнює n·x^(n-1).", tip: "Тут n = 2." },
    { title: "Підставте n", description: "f'(x) = 2x^(1).", tip: "Показник зменшуємо на 1." },
    { title: "Спростіть", description: "f'(x) = 2x.", tip: "Отримали похідну." }
  ) }),
  problem({ id: "derivatives-2", moduleId: "derivatives", topic: "Похідна", level: "Поглиблений", title: "Знайдіть похідну", prompt: "f(x) = x^3", answer: "3x^2", variants: ["3x²"], steps: steps(
    { title: "Застосуйте правило степеня", description: "Похідна x^3 — це 3x².", tip: "Помножте на показник." },
    { title: "Зменште показник", description: "3 - 1 = 2.", tip: "Новий показник на одиницю менший." },
    { title: "Запишіть відповідь", description: "f'(x) = 3x².", tip: "Можна лишити у степеневому вигляді." }
  ) }),
  problem({ id: "derivatives-3", moduleId: "derivatives", topic: "Похідна", level: "Поглиблений", title: "Обчисліть значення похідної", prompt: "f(x) = x^2, x = 3", answer: "6", variants: [], steps: steps(
    { title: "Знайдіть похідну", description: "f'(x) = 2x.", tip: "Використайте правило степеня." },
    { title: "Підставте x = 3", description: "f'(3) = 2 · 3.", tip: "Працюємо вже з похідною." },
    { title: "Обчисліть", description: "f'(3) = 6.", tip: "Це значення похідної у точці." }
  ) }),

  problem({ id: "integrals-1", moduleId: "integrals", topic: "Інтеграли", level: "Поглиблений", title: "Знайдіть первісну", prompt: "∫ 2x dx", answer: "x^2 + C", variants: ["x² + C"], steps: steps(
    { title: "Знайдіть функцію з такою похідною", description: "Похідна x² дорівнює 2x.", tip: "Шукаємо обернену дію до диференціювання." },
    { title: "Запишіть первісну", description: "Однією з первісних є x².", tip: "Усі первісні відрізняються на сталу." },
    { title: "Додайте C", description: "Отримуємо x² + C.", tip: "Сталу додають завжди." }
  ) }),
  problem({ id: "integrals-2", moduleId: "integrals", topic: "Інтеграли", level: "Поглиблений", title: "Знайдіть первісну", prompt: "∫ 5 dx", answer: "5x + C", variants: [], steps: steps(
    { title: "Згадайте базове правило", description: "Первісна від сталої a дорівнює ax + C.", tip: "Тут a = 5." },
    { title: "Підставте значення", description: "Отже, первісна має вигляд 5x + C.", tip: "Похідна від 5x дорівнює 5." },
    { title: "Запишіть відповідь", description: "∫ 5 dx = 5x + C.", tip: "Не забудьте сталу." }
  ) }),
  problem({ id: "integrals-3", moduleId: "integrals", topic: "Інтеграли", level: "Поглиблений", title: "Обчисліть визначений інтеграл", prompt: "∫[0;1] x dx", answer: "1/2", variants: ["0.5"], steps: steps(
    { title: "Знайдіть первісну", description: "Первісна для x — це x²/2.", tip: "Використайте правило степеня навпаки." },
    { title: "Підставте межі", description: "1²/2 - 0²/2.", tip: "Верхня межа мінус нижня." },
    { title: "Обчисліть", description: "1/2 - 0 = 1/2.", tip: "Маємо значення інтеграла." }
  ) }),

  problem({ id: "vectors-1", moduleId: "vectors", topic: "Вектори", level: "Поглиблений", title: "Знайдіть довжину вектора", prompt: "a = (3, 4)", answer: "5", variants: [], steps: steps(
    { title: "Запишіть формулу", description: "|a| = √(x² + y²).", tip: "Для вектора на площині цього достатньо." },
    { title: "Підставте координати", description: "√(3² + 4²) = √25.", tip: "Зведіть координати до квадратів." },
    { title: "Знайдіть корінь", description: "√25 = 5.", tip: "Це класичний випадок 3-4-5." }
  ) }),
  problem({ id: "vectors-2", moduleId: "vectors", topic: "Вектори", level: "Поглиблений", title: "Координати вектора AB", prompt: "A(1,2), B(4,6)", answer: "(3,4)", variants: ["3,4"], steps: steps(
    { title: "Відніміть координати початку", description: "x: 4 - 1 = 3.", tip: "Перша координата — різниця x." },
    { title: "Знайдіть другу координату", description: "y: 6 - 2 = 4.", tip: "Друга координата — різниця y." },
    { title: "Запишіть вектор", description: "AB = (3, 4).", tip: "Координати записують у дужках." }
  ) }),
  problem({ id: "vectors-3", moduleId: "vectors", topic: "Вектори", level: "Поглиблений", title: "Скалярний добуток", prompt: "a = (1,2), b = (3,4)", answer: "11", variants: [], steps: steps(
    { title: "Згадайте формулу", description: "a·b = x1x2 + y1y2.", tip: "Перемножте відповідні координати." },
    { title: "Підставте значення", description: "1·3 + 2·4.", tip: "Маємо два доданки." },
    { title: "Обчисліть", description: "3 + 8 = 11.", tip: "Отримали скалярний добуток." }
  ) }),

  problem({ id: "exam-1", moduleId: "exam", topic: "Підсумкова практика", level: "Середній", title: "Комбінована лінійна задача", prompt: "4x - 6 = 10", answer: "x = 4", variants: ["4", "x=4"], steps: steps(
    { title: "Перенесіть число", description: "4x = 16.", tip: "Додайте 6 до обох частин." },
    { title: "Поділіть на 4", description: "x = 4.", tip: "Ізолюйте змінну." },
    { title: "Перевірте", description: "4 · 4 - 6 = 10.", tip: "Перевірка завершує задачу." }
  ) }),
  problem({ id: "exam-2", moduleId: "exam", topic: "Підсумкова практика", level: "Середній", title: "Комбінована задача на відсотки", prompt: "20% від 150", answer: "30", variants: [], steps: steps(
    { title: "Переведіть у дріб", description: "20% = 0.2.", tip: "Поділіть на 100." },
    { title: "Помножте на 150", description: "0.2 · 150 = 30.", tip: "Знаходимо частину від числа." },
    { title: "Запишіть результат", description: "Відповідь: 30.", tip: "Переконайтесь, що число менше за 150." }
  ) }),
  problem({ id: "exam-3", moduleId: "exam", topic: "Підсумкова практика", level: "Середній", title: "Комбінована геометрична задача", prompt: "периметр квадрата зі стороною 9", answer: "36", variants: ["36 см"], steps: steps(
    { title: "Пригадайте формулу", description: "P = 4a.", tip: "У квадрата чотири рівні сторони." },
    { title: "Підставте сторону", description: "P = 4 · 9.", tip: "Помножте сторону на 4." },
    { title: "Обчисліть", description: "P = 36.", tip: "Отримали периметр квадрата." }
  ) })
];
