async function loadAdvice() {
  try {
    const response = await fetch("advice.json");
    const adviceData = await response.json();
    return adviceData;
  } catch (error) {
    console.error("Не вдалося завантажити advice.json:", error);
    return null;
  }
}

async function checkValues() {
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const leukocytes = parseFloat(document.getElementById("leukocytes").value);
  const hematocrit = parseFloat(document.getElementById("hematocrit").value);
  const erythrocytes = parseFloat(
    document.getElementById("erythrocytes").value
  );

  // Валідація віку та статі
  if (gender === "child" && age >= 12) {
    alert("Для дітей вік має бути менше 12 років.");
    return;
  } else if ((gender === "male" || gender === "female") && age < 12) {
    alert("Для чоловіків та жінок вік має бути 12 років або більше.");
    return;
  } else if (
    (gender === "teenMale" || gender === "teenFemale") &&
    (age < 12 || age > 18)
  ) {
    alert("Для підлітків вік має бути між 12 та 18 роками.");
    return;
  }

  const adviceData = await loadAdvice();
  if (!adviceData) return;

  let adviceMessages = "";

  // Лейкоцити
  adviceMessages +=
    getAdviceForUser(
      adviceData.leukocytes,
      leukocytes,
      age,
      gender,
      "лейкоцити"
    ) + "<br>";

  // Гематокрит
  adviceMessages +=
    getAdviceForUser(
      adviceData.hematocrit,
      hematocrit,
      age,
      gender,
      "гематокрит"
    ) + "<br>";

  // Еритроцити
  adviceMessages += getAdviceForUser(
    adviceData.erythrocytes,
    erythrocytes,
    age,
    gender,
    "еритроцити"
  );

  document.getElementById("advice").innerHTML = adviceMessages;
}

function getAdviceForUser(parameterAdvice, value, age, gender, description) {
  let ageGroup;

  // Визначення вікової групи
  if (age < 12) {
    ageGroup = "children";
  } else if (age >= 12 && age <= 18) {
    ageGroup = gender === "teenMale" ? "adolescent_boys" : "adolescent_girls";
  } else {
    ageGroup = "adults";
  }

  const parameterAdviceGroup = parameterAdvice[ageGroup];

  // Перевірка наявності даних для цієї вікової групи
  if (!parameterAdviceGroup) {
    return `Дані для вікової групи "${ageGroup}" не знайдено для показника "${description}".`;
  }

  const normalRange = parameterAdviceGroup.normal.split("-").map(Number);
  const [min, max] = normalRange;

  // Порівняння значення з нормальним діапазоном та повернення відповідної поради
  if (value < min) {
    return parameterAdviceGroup.advice_decreased;
  } else if (value > max) {
    return parameterAdviceGroup.advice_increased;
  } else {
    return `Ваш рівень ${description} у нормі.`;
  }
}

window.checkValues = checkValues;
