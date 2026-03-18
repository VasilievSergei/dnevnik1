const app = document.querySelector('#app');

const state = {
  currentUser: null,
  currentView: 'dashboard',
  selectedWeekOffset: 0,
  lessonDetailsId: null,
};

const schoolOptions = [
  { id: 1, name: 'Школа №12' },
  { id: 2, name: 'Лицей "Горизонт"' },
];

const teacherOptions = [
  { id: 1, schoolId: 1, name: 'Анна Смирнова', email: 'teacher@school.ru' },
  { id: 2, schoolId: 2, name: 'Игорь Волков', email: 'physics@school.ru' },
];

const classOptions = [
  { id: 1, name: '7А', year: 2025, teacherIds: [1], studentIds: [101, 102, 103] },
  { id: 2, name: '8Б', year: 2025, teacherIds: [1, 2], studentIds: [104, 105] },
];

const subjectOptions = [
  { id: 1, teacherId: 1, name: 'Алгебра' },
  { id: 2, teacherId: 1, name: 'Геометрия' },
  { id: 3, teacherId: 2, name: 'Физика' },
  { id: 4, teacherId: 1, name: 'Информатика' },
];

const students = [
  { id: 101, classId: 1, name: 'Мария Иванова', email: 'student@school.ru', username: 'masha', birthDate: '2012-04-03' },
  { id: 102, classId: 1, name: 'Лев Петров', email: 'lev@school.ru', username: 'lev' },
  { id: 103, classId: 1, name: 'София Ким', email: 'sofia@school.ru', username: 'sofia' },
  { id: 104, classId: 2, name: 'Олег Морозов', email: 'oleg@school.ru', username: 'oleg' },
  { id: 105, classId: 2, name: 'Ирина Белова', email: 'irina@school.ru', username: 'irina' },
];

const lessons = [
  { id: 11, classId: 1, subjectId: 1, teacherId: 1, date: '2026-03-16', start: '08:30', end: '09:15', room: '204', topic: 'Квадратные уравнения' },
  { id: 12, classId: 1, subjectId: 4, teacherId: 1, date: '2026-03-17', start: '10:10', end: '10:55', room: '310', topic: 'Таблицы и формулы' },
  { id: 13, classId: 1, subjectId: 2, teacherId: 1, date: '2026-03-18', start: '09:20', end: '10:05', room: '204', topic: 'Треугольники' },
  { id: 14, classId: 2, subjectId: 3, teacherId: 2, date: '2026-03-19', start: '11:05', end: '11:50', room: '105', topic: 'Давление жидкостей' },
  { id: 15, classId: 1, subjectId: 1, teacherId: 1, date: '2026-03-20', start: '08:30', end: '09:15', room: '204', topic: 'Решение задач' },
  { id: 16, classId: 1, subjectId: 1, teacherId: 1, date: '2026-03-09', start: '08:30', end: '09:15', room: '204', topic: 'Формулы сокращенного умножения' },
  { id: 17, classId: 1, subjectId: 1, teacherId: 1, date: '2026-03-23', start: '08:30', end: '09:15', room: '204', topic: 'Контрольная работа' },
];

const assignments = [
  { id: 1, lessonId: 11, title: '№ 241, 244', description: 'Решить уравнения и оформить решения в тетради.', dueDate: '2026-03-18' },
  { id: 2, lessonId: 12, title: 'Таблица бюджета семьи', description: 'Собрать данные и оформить таблицу.', dueDate: '2026-03-21' },
  { id: 3, lessonId: 14, title: 'Параграф 18', description: 'Выучить определения и подготовить 3 вопроса.', dueDate: '2026-03-22' },
];

const grades = [
  { id: 1, studentId: 101, lessonId: 16, value: '4', comment: 'Хорошая самостоятельная', date: '2026-03-09' },
  { id: 2, studentId: 101, lessonId: 11, value: '5', comment: 'Активная работа', date: '2026-03-16' },
  { id: 3, studentId: 101, lessonId: 13, value: '3', comment: 'Нужно повторить тему', date: '2026-03-18' },
  { id: 4, studentId: 101, lessonId: 12, value: '5', comment: 'Практическая без ошибок', date: '2026-03-17' },
  { id: 5, studentId: 102, lessonId: 11, value: '3', comment: 'Сделал не все задания', date: '2026-03-16' },
  { id: 6, studentId: 103, lessonId: 11, value: '5', comment: 'Отлично', date: '2026-03-16' },
  { id: 7, studentId: 104, lessonId: 14, value: '4', comment: 'Хорошо', date: '2026-03-19' },
];

const attendances = [
  { id: 1, studentId: 101, lessonId: 16, status: 'p', comment: 'Присутствовал', date: '2026-03-09' },
  { id: 2, studentId: 101, lessonId: 11, status: 'p', comment: 'Присутствовал', date: '2026-03-16' },
  { id: 3, studentId: 101, lessonId: 12, status: 'l', comment: 'Опоздал на 5 минут', date: '2026-03-17' },
  { id: 4, studentId: 101, lessonId: 13, status: 'a', comment: 'Отсутствовал по болезни', date: '2026-03-18' },
  { id: 5, studentId: 102, lessonId: 11, status: 'a', comment: 'Нет справки', date: '2026-03-16' },
  { id: 6, studentId: 103, lessonId: 11, status: 'p', comment: 'Присутствовал', date: '2026-03-16' },
  { id: 7, studentId: 104, lessonId: 14, status: 'p', comment: 'Присутствовал', date: '2026-03-19' },
];

const users = [
  { id: 'admin-1', role: 'admin', name: 'Администратор', email: 'admin@school.ru', password: 'admin123' },
  { id: 'teacher-1', role: 'teacher', name: 'Анна Смирнова', email: 'teacher@school.ru', password: 'teacher123', teacherId: 1 },
  { id: 'student-1', role: 'student', name: 'Мария Иванова', email: 'student@school.ru', password: 'student123', studentId: 101 },
];

function getSubject(id) { return subjectOptions.find((s) => s.id === id); }
function getTeacher(id) { return teacherOptions.find((t) => t.id === id); }
function getClass(id) { return classOptions.find((c) => c.id === id); }
function getLesson(id) { return lessons.find((l) => l.id === id); }
function getStudent(id) { return students.find((s) => s.id === id); }
function formatDate(date) { return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }); }
function formatLongDate(date) { return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }); }
function weekBounds(offset = 0) {
  const now = new Date('2026-03-18T12:00:00');
  const day = now.getDay() || 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - day + 1 + offset * 7);
  monday.setHours(0,0,0,0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { monday, sunday };
}
function inRange(date, start, end) {
  const d = new Date(date);
  return d >= start && d <= end;
}

function render() {
  app.innerHTML = state.currentUser ? layout() : loginPage();
  bindEvents();
}

function loginPage() {
  return `
    <div class="login-shell">
      <section class="login-card">
        <div>
          <span class="eyebrow">Система управления образованием</span>
          <h1>Электронный дневник</h1>
          <p class="muted">Вход по выданным учетным данным. Роль определяется автоматически по аккаунту.</p>
        </div>
        <form id="login-form" class="login-form">
          <label><span>Email</span><input type="email" name="email" value="teacher@school.ru" required /></label>
          <label><span>Пароль</span><input type="password" name="password" value="teacher123" required /></label>
          <button type="submit" class="primary">Войти</button>
        </form>
        <div class="demo-grid">
          <button class="ghost demo-btn" data-demo="admin">Админ: admin@school.ru / admin123</button>
          <button class="ghost demo-btn" data-demo="teacher">Учитель: teacher@school.ru / teacher123</button>
          <button class="ghost demo-btn" data-demo="student">Ученик: student@school.ru / student123</button>
        </div>
      </section>
    </div>`;
}

function layout() {
  const nav = getNav();
  return `<div class="app-shell">
    ${state.currentUser.role === 'admin' ? '' : `<aside class="sidebar"><div><h2>Электронный дневник</h2><p class="muted">${state.currentUser.name}</p></div><nav>${nav.map(item => `<button class="nav-link ${state.currentView === item.id ? 'active' : ''}" data-nav="${item.id}">${item.label}</button>`).join('')}</nav><button class="ghost logout-btn" data-action="logout">Выйти</button></aside>`}
    <main class="content ${state.currentUser.role === 'admin' ? 'admin-only' : ''}">
      ${state.currentUser.role === 'admin' ? `<div class="topbar admin-topbar"><div><span class="eyebrow">Административный доступ</span><h1>Админка</h1></div><button class="ghost logout-btn" data-action="logout">Выйти</button></div>` : header()}
      ${view()}
    </main>
  </div>`;
}

function getNav() {
  if (state.currentUser.role === 'teacher') return [
    { id: 'dashboard', label: 'Главная' },
    { id: 'classes', label: 'Мои классы' },
    { id: 'schedule', label: 'Расписание' },
    { id: 'grades', label: 'Оценки' },
    { id: 'homework', label: 'Домашние задания' },
  ];
  return [
    { id: 'dashboard', label: 'Главная' },
    { id: 'schedule', label: 'Расписание' },
    { id: 'grades', label: 'Оценки' },
    { id: 'homework', label: 'Домашние задания' },
  ];
}

function header() {
  const titles = { dashboard: 'Главная', classes: 'Мои классы', schedule: 'Расписание', grades: 'Оценки и посещаемость', homework: 'Домашние задания', lesson: 'Урок', admin: 'Админка' };
  return `<div class="topbar"><div><span class="eyebrow">${state.currentUser.role === 'teacher' ? 'Учитель' : 'Ученик / Родитель'}</span><h1>${titles[state.currentView]}</h1></div><button class="ghost logout-btn" data-action="logout">Выйти</button></div>`;
}

function view() {
  if (state.currentUser.role === 'admin') return adminView();
  switch (state.currentView) {
    case 'dashboard': return state.currentUser.role === 'teacher' ? teacherDashboard() : studentDashboard();
    case 'classes': return teacherClassesView();
    case 'schedule': return scheduleView();
    case 'grades': return gradesView();
    case 'homework': return homeworkView();
    case 'lesson': return lessonView();
    default: return '';
  }
}

function teacherDashboard() {
  const teacherClasses = classOptions.filter(c => c.teacherIds.includes(state.currentUser.teacherId));
  return `<section class="grid cols-3">
    <article class="card stat"><h3>Классов под кураторством</h3><strong>${teacherClasses.length}</strong><p>Список классов и учеников всегда под рукой.</p></article>
    <article class="card stat"><h3>Уроков на этой неделе</h3><strong>${lessons.filter(l => l.teacherId === state.currentUser.teacherId && inRange(l.date, weekBounds().monday, weekBounds().sunday)).length}</strong><p>Переход к уроку — прямо из расписания.</p></article>
    <article class="card stat"><h3>Предметов</h3><strong>${subjectOptions.filter(s => s.teacherId === state.currentUser.teacherId).length}</strong><p>Можно добавлять новые предметы и использовать их при создании уроков.</p></article>
  </section>
  <section class="grid cols-2">
    <article class="card"><h3>Быстрые действия</h3><div class="button-row"><button class="primary" data-nav="classes">Добавить класс</button><button class="ghost" data-nav="schedule">Открыть расписание</button></div></article>
    <article class="card"><h3>Ближайшие уроки</h3>${upcomingLessons(state.currentUser.teacherId)}</article>
  </section>`;
}

function studentDashboard() {
  const student = getStudent(state.currentUser.studentId);
  const className = getClass(student.classId).name;
  const myGrades = grades.filter(g => g.studentId === student.id);
  const myAttendance = attendances.filter(a => a.studentId === student.id);
  const avg = averageBySubject(student.id);
  return `<section class="grid cols-4">
    <article class="card stat"><h3>Мой класс</h3><strong>${className}</strong><p>Класс и учебный год видны сразу после входа.</p></article>
    <article class="card stat"><h3>Предметов с оценками</h3><strong>${Object.keys(avg).length}</strong><p>Средний балл считается отдельно по каждому предмету.</p></article>
    <article class="card stat"><h3>Посещаемость</h3><strong>${myAttendance.filter(a => a.status === 'p').length}/${myAttendance.length}</strong><p>Статусы занятий интегрированы в журнал оценок.</p></article>
    <article class="card stat"><h3>Домашние задания</h3><strong>${assignments.filter(a => getLesson(a.lessonId).classId === student.classId).length}</strong><p>Только задания по твоему расписанию.</p></article>
  </section>
  <section class="grid cols-3">
    <article class="card"><h3>По предметам</h3><div class="pill-list">${Object.entries(avg).map(([subject, value]) => `<span class="pill">${subject}: ${value}</span>`).join('')}</div></article>
    <article class="card"><h3>На этой неделе</h3><ul class="clean-list"><li>${scheduleSummary(student.classId)}</li></ul></article>
    <article class="card"><h3>Совет</h3><p class="muted">Наведите курсор на оценку или отметку посещаемости, чтобы увидеть дату и комментарий.</p></article>
  </section>`;
}

function teacherClassesView() {
  const teacherClasses = classOptions.filter(c => c.teacherIds.includes(state.currentUser.teacherId));
  return `<section class="card"><div class="section-head"><div><h2>Классы и состав</h2><p class="muted">Количество учеников считается автоматически. Экспорт убран.</p></div>
  <div class="button-row"><button class="primary" data-action="add-class">Добавить класс</button><button class="ghost" data-action="add-student">Добавить ученика</button></div></div>
  <div class="class-grid">${teacherClasses.map(c => `<article class="subcard"><h3>${c.name}</h3><p>${c.year}/${c.year + 1} учебный год</p><p>Учеников: ${c.studentIds.length}</p><p>Кураторы: ${c.teacherIds.map(id => getTeacher(id).name).join(', ')}</p></article>`).join('')}</div></section>
  <section class="card"><h2>Список учеников</h2>
  <table><thead><tr><th>Ученик</th><th>Класс</th><th>Логин</th></tr></thead><tbody>
  ${students.filter(s => teacherClasses.some(c => c.id === s.classId)).map(s => `<tr><td>${s.name}</td><td>${getClass(s.classId).name}</td><td>${s.username}</td></tr>`).join('')}
  </tbody></table></section>`;
}

function scheduleView() {
  const { monday, sunday } = weekBounds(state.selectedWeekOffset);
  let weeklyLessons;
  if (state.currentUser.role === 'teacher') weeklyLessons = lessons.filter(l => l.teacherId === state.currentUser.teacherId && inRange(l.date, monday, sunday));
  else weeklyLessons = lessons.filter(l => l.classId === getStudent(state.currentUser.studentId).classId && inRange(l.date, monday, sunday));
  return `<section class="card"><div class="section-head"><div><h2>Неделя ${formatDate(monday)} — ${formatDate(sunday)}</h2><p class="muted">${state.currentUser.role === 'student' ? 'Показано только расписание текущей выбранной недели.' : 'Каждый урок привязан к предмету и учителю.'}</p></div><div class="button-row"><button class="ghost" data-action="prev-week">← Предыдущая</button><button class="ghost" data-action="next-week">Следующая →</button>${state.currentUser.role === 'teacher' ? '<button class="primary" data-action="add-lesson">Добавить урок</button>' : ''}</div></div>
  <div class="schedule-list">${weeklyLessons.sort((a,b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start)).map(lessonCard).join('') || '<p class="muted">На выбранной неделе уроков нет.</p>'}</div></section>`;
}

function lessonCard(lesson) {
  return `<button class="lesson-card" data-open-lesson="${lesson.id}">
    <div><strong>${getSubject(lesson.subjectId).name}</strong><span>${formatLongDate(lesson.date)}, ${lesson.start}–${lesson.end}</span></div>
    <div><span>${getClass(lesson.classId).name}</span><span>${getTeacher(lesson.teacherId).name}</span></div>
  </button>`;
}

function gradesView() {
  return state.currentUser.role === 'teacher' ? teacherGradesView() : studentGradesView();
}

function teacherGradesView() {
  const teacherLessons = lessons.filter(l => l.teacherId === state.currentUser.teacherId);
  const groupedByClass = classOptions.filter(c => c.teacherIds.includes(state.currentUser.teacherId));
  return `<section class="card"><div class="section-head"><div><h2>Журнал оценок и посещаемости</h2><p class="muted">Панель объединяет отметки и статусы p/l/a по аналогии с журналом.</p></div><button class="primary" data-nav="schedule">Выбрать урок из расписания</button></div>
  ${groupedByClass.map(cls => {
    const classLessons = teacherLessons.filter(l => l.classId === cls.id);
    const dates = [...new Set(classLessons.map(l => l.date))].sort();
    return `<div class="journal-block"><div class="journal-title"><h3>${cls.name}</h3><span>${classLessons.map(l => getSubject(l.subjectId).name).filter((v,i,a)=>a.indexOf(v)===i).join(', ')}</span></div>
      <div class="table-wrap"><table class="journal-table"><thead><tr><th>Ученик</th>${dates.map(d => `<th>${formatDate(d)}</th>`).join('')}</tr></thead><tbody>
      ${students.filter(s => s.classId === cls.id).map(student => `<tr><td>${student.name}</td>${dates.map(date => {
        const lessonForDate = classLessons.find(l => l.date === date);
        const grade = grades.find(g => g.studentId === student.id && g.lessonId === lessonForDate?.id);
        const attendance = attendances.find(a => a.studentId === student.id && a.lessonId === lessonForDate?.id);
        return `<td><div class="cell-stack">${grade ? `<span class="grade-chip grade-${grade.value}" title="${grade.comment} · ${formatLongDate(grade.date)}">${grade.value}</span>` : '<span class="grade-empty">—</span>'}${attendance ? `<span class="att-chip att-${attendance.status}" title="${attendance.comment} · ${formatLongDate(attendance.date)}">${attendance.status}</span>` : ''}</div></td>`;
      }).join('')}</tr>`).join('')}
      </tbody></table></div></div>`;
  }).join('')}</section>`;
}

function studentGradesView() {
  const studentId = state.currentUser.studentId;
  const subjectMap = {};
  grades.filter(g => g.studentId === studentId).forEach(g => {
    const lesson = getLesson(g.lessonId);
    const subject = getSubject(lesson.subjectId).name;
    subjectMap[subject] ??= [];
    subjectMap[subject].push({ type: 'grade', label: g.value, title: `${formatLongDate(g.date)} · ${g.comment}` });
  });
  attendances.filter(a => a.studentId === studentId).forEach(a => {
    const lesson = getLesson(a.lessonId);
    const subject = getSubject(lesson.subjectId).name;
    subjectMap[subject] ??= [];
    subjectMap[subject].push({ type: 'attendance', label: a.status, title: `${formatLongDate(a.date)} · ${a.comment}` });
  });
  Object.values(subjectMap).forEach(items => items.sort((x,y) => x.title.localeCompare(y.title)));
  const averages = averageBySubject(studentId);
  return `<section class="card"><h2>Мой журнал</h2><p class="muted">Оценки и посещаемость объединены в одну таблицу. Наведите курсор на метку для даты и комментария.</p>
  <table><thead><tr><th>Предмет</th><th>Оценки и статусы</th><th>Средний балл</th></tr></thead><tbody>
  ${Object.entries(subjectMap).map(([subject, items]) => `<tr><td>${subject}</td><td><div class="marks-row">${items.map(item => `<span class="${item.type === 'grade' ? `grade-chip grade-${item.label}` : `att-chip att-${item.label}`}" title="${item.title}">${item.label}</span>`).join('')}</div></td><td>${averages[subject] ?? '—'}</td></tr>`).join('')}
  </tbody></table></section>`;
}

function homeworkView() {
  const relevantAssignments = state.currentUser.role === 'teacher'
    ? assignments.filter(a => lessons.some(l => l.id === a.lessonId && l.teacherId === state.currentUser.teacherId))
    : assignments.filter(a => getLesson(a.lessonId).classId === getStudent(state.currentUser.studentId).classId);
  return `<section class="card"><div class="section-head"><div><h2>Домашние задания</h2><p class="muted">${state.currentUser.role === 'teacher' ? 'Создание ДЗ доступно и открывает рабочую форму.' : 'Показаны только задания по вашему классу.'}</p></div>${state.currentUser.role === 'teacher' ? '<button class="primary" data-action="add-homework">Создать ДЗ</button>' : ''}</div>
  <div class="homework-list">${relevantAssignments.map(a => {
    const lesson = getLesson(a.lessonId);
    return `<article class="subcard"><div class="subcard-head"><h3>${a.title}</h3><span>до ${formatLongDate(a.dueDate)}</span></div><p>${a.description}</p><p class="muted">${getSubject(lesson.subjectId).name} · ${getClass(lesson.classId).name}</p></article>`;
  }).join('')}</div></section>`;
}

function lessonView() {
  const lesson = getLesson(state.lessonDetailsId);
  if (!lesson) return '<section class="card"><p>Урок не найден.</p></section>';
  const classStudents = students.filter(s => s.classId === lesson.classId);
  const hw = assignments.find(a => a.lessonId === lesson.id);
  return `<section class="card"><div class="section-head"><div><button class="link-btn" data-nav="schedule">← Назад к расписанию</button><h2>${getSubject(lesson.subjectId).name}</h2><p class="muted">${formatLongDate(lesson.date)} · ${lesson.start}–${lesson.end} · ${getClass(lesson.classId).name} · ${getTeacher(lesson.teacherId).name}</p></div></div>
  <div class="grid cols-2"><article class="subcard"><h3>Тема урока</h3><p>${lesson.topic}</p><p class="muted">Кабинет ${lesson.room}</p></article><article class="subcard"><h3>Домашнее задание</h3><p>${hw ? hw.title : 'Пока не задано'}</p><p class="muted">${hw ? hw.description : 'Можно создать прямо отсюда через страницу ДЗ.'}</p></article></div>
  ${state.currentUser.role === 'teacher' ? `<div class="grid cols-2"><article class="subcard"><h3>Выставить оценку</h3><form id="quick-grade-form" class="inline-form"><select name="studentId">${classStudents.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select><select name="grade"><option>5</option><option>4</option><option>3</option><option>2</option></select><button class="primary" type="submit">Сохранить</button></form></article><article class="subcard"><h3>Отметить посещаемость</h3><form id="quick-attendance-form" class="inline-form"><select name="studentId">${classStudents.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select><select name="status"><option value="p">p</option><option value="l">l</option><option value="a">a</option></select><button class="primary" type="submit">Сохранить</button></form></article></div>` : ''}
  <div class="table-wrap"><table><thead><tr><th>Ученик</th><th>Оценка</th><th>Посещаемость</th></tr></thead><tbody>${classStudents.map(s => {
    const grade = grades.find(g => g.lessonId === lesson.id && g.studentId === s.id);
    const attendance = attendances.find(a => a.lessonId === lesson.id && a.studentId === s.id);
    return `<tr><td>${s.name}</td><td>${grade ? `<span class="grade-chip grade-${grade.value}">${grade.value}</span>` : '—'}</td><td>${attendance ? `<span class="att-chip att-${attendance.status}">${attendance.status}</span>` : '—'}</td></tr>`;
  }).join('')}</tbody></table></div></section>`;
}

function adminView() {
  return `<section class="grid cols-2"><article class="card"><div class="section-head"><div><h2>Школы</h2><p class="muted">Админ видит только админку и может управлять школами.</p></div><button class="primary" data-action="add-school">Создать школу</button></div>
  <div class="stack">${schoolOptions.map(s => `<div class="row-card"><div><strong>${s.name}</strong><p class="muted">ID: ${s.id}</p></div><button class="danger" data-action="delete-school" data-id="${s.id}">Удалить</button></div>`).join('')}</div></article>
  <article class="card"><div class="section-head"><div><h2>Учителя</h2><p class="muted">Учителя создаются только внутри уже существующей школы.</p></div><button class="primary" data-action="add-teacher">Создать учителя</button></div>
  <div class="stack">${teacherOptions.map(t => `<div class="row-card"><div><strong>${t.name}</strong><p class="muted">${t.email} · ${schoolOptions.find(s => s.id === t.schoolId)?.name}</p></div><button class="danger" data-action="delete-teacher" data-id="${t.id}">Удалить</button></div>`).join('')}</div></article></section>`;
}

function upcomingLessons(teacherId) {
  return `<ul class="clean-list">${lessons.filter(l => l.teacherId === teacherId).slice(0,3).map(l => `<li>${formatLongDate(l.date)} · ${getSubject(l.subjectId).name} · ${getClass(l.classId).name}</li>`).join('')}</ul>`;
}
function scheduleSummary(classId) {
  return lessons.filter(l => l.classId === classId && inRange(l.date, weekBounds().monday, weekBounds().sunday)).map(l => `${formatDate(l.date)} · ${getSubject(l.subjectId).name}`).join(', ');
}
function averageBySubject(studentId) {
  const result = {};
  const grouped = {};
  grades.filter(g => g.studentId === studentId).forEach(g => {
    const subject = getSubject(getLesson(g.lessonId).subjectId).name;
    grouped[subject] ??= [];
    grouped[subject].push(Number(g.value));
  });
  Object.entries(grouped).forEach(([subject, values]) => { result[subject] = (values.reduce((a,b) => a+b, 0) / values.length).toFixed(1); });
  return result;
}

function bindEvents() {
  document.querySelector('#login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const user = users.find(u => u.email === data.get('email') && u.password === data.get('password'));
    if (!user) return alert('Неверные данные');
    state.currentUser = user;
    state.currentView = user.role === 'admin' ? 'admin' : 'dashboard';
    render();
  });
  document.querySelectorAll('.demo-btn').forEach(btn => btn.addEventListener('click', () => {
    const map = { admin: users[0], teacher: users[1], student: users[2] };
    state.currentUser = map[btn.dataset.demo];
    state.currentView = state.currentUser.role === 'admin' ? 'admin' : 'dashboard';
    render();
  }));
  document.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => { state.currentView = btn.dataset.nav; render(); }));
  document.querySelectorAll('[data-open-lesson]').forEach(btn => btn.addEventListener('click', () => { state.lessonDetailsId = Number(btn.dataset.openLesson); state.currentView = 'lesson'; render(); }));
  document.querySelectorAll('[data-action="logout"]').forEach(btn => btn.addEventListener('click', () => { state.currentUser = null; state.currentView = 'dashboard'; state.lessonDetailsId = null; render(); }));
  document.querySelector('[data-action="prev-week"]')?.addEventListener('click', () => { state.selectedWeekOffset -= 1; render(); });
  document.querySelector('[data-action="next-week"]')?.addEventListener('click', () => { state.selectedWeekOffset += 1; render(); });
  document.querySelector('[data-action="add-class"]')?.addEventListener('click', () => {
    const name = prompt('Название класса', '9В');
    if (!name) return;
    classOptions.push({ id: Date.now(), name, year: 2025, teacherIds: [state.currentUser.teacherId], studentIds: [] });
    render();
  });
  document.querySelector('[data-action="add-student"]')?.addEventListener('click', () => {
    const name = prompt('Имя ученика', 'Новый ученик');
    if (!name) return;
    const classId = Number(prompt(`ID класса для привязки: ${classOptions.map(c => `${c.id}=${c.name}`).join(', ')}`, '1'));
    if (!getClass(classId)) return alert('Класс не найден');
    const id = Date.now();
    students.push({ id, classId, name, email: `student${id}@school.ru`, username: `student${id}` });
    getClass(classId).studentIds.push(id);
    render();
  });
  document.querySelector('[data-action="add-lesson"]')?.addEventListener('click', () => {
    const subjectId = Number(prompt(`Выберите предмет по ID: ${subjectOptions.filter(s => s.teacherId === state.currentUser.teacherId).map(s => `${s.id}=${s.name}`).join(', ')}`, '1'));
    const classId = Number(prompt(`Выберите класс по ID: ${classOptions.filter(c => c.teacherIds.includes(state.currentUser.teacherId)).map(c => `${c.id}=${c.name}`).join(', ')}`, '1'));
    if (!getSubject(subjectId) || !getClass(classId)) return alert('Проверьте предмет и класс');
    lessons.push({ id: Date.now(), classId, subjectId, teacherId: state.currentUser.teacherId, date: '2026-03-21', start: '12:00', end: '12:45', room: '205', topic: 'Новый урок' });
    render();
  });
  document.querySelector('[data-action="add-homework"]')?.addEventListener('click', () => {
    const lessonId = Number(prompt(`ID урока: ${lessons.filter(l => l.teacherId === state.currentUser.teacherId).map(l => `${l.id}=${getSubject(l.subjectId).name} ${formatDate(l.date)}`).join(', ')}`, '11'));
    const title = prompt('Тема ДЗ', 'Подготовить конспект');
    if (!getLesson(lessonId) || !title) return;
    assignments.push({ id: Date.now(), lessonId, title, description: 'Создано из интерфейса учителя.', dueDate: '2026-03-25' });
    render();
  });
  document.querySelector('#quick-grade-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    grades.push({ id: Date.now(), studentId: Number(data.get('studentId')), lessonId: state.lessonDetailsId, value: data.get('grade'), comment: 'Выставлено на странице урока', date: getLesson(state.lessonDetailsId).date });
    render();
  });
  document.querySelector('#quick-attendance-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    attendances.push({ id: Date.now(), studentId: Number(data.get('studentId')), lessonId: state.lessonDetailsId, status: data.get('status'), comment: 'Отмечено на странице урока', date: getLesson(state.lessonDetailsId).date });
    render();
  });
  document.querySelector('[data-action="add-school"]')?.addEventListener('click', () => {
    const name = prompt('Название школы', 'Новая школа');
    if (!name) return;
    schoolOptions.push({ id: Date.now(), name }); render();
  });
  document.querySelector('[data-action="add-teacher"]')?.addEventListener('click', () => {
    const schoolId = Number(prompt(`ID школы: ${schoolOptions.map(s => `${s.id}=${s.name}`).join(', ')}`, `${schoolOptions[0]?.id || ''}`));
    if (!schoolOptions.find(s => s.id === schoolId)) return alert('Сначала создайте школу');
    const name = prompt('Имя учителя', 'Новый учитель');
    if (!name) return;
    teacherOptions.push({ id: Date.now(), schoolId, name, email: `${name.toLowerCase().replace(/\s+/g,'')}@school.ru` }); render();
  });
  document.querySelectorAll('[data-action="delete-school"]').forEach(btn => btn.addEventListener('click', () => {
    const id = Number(btn.dataset.id); const idx = schoolOptions.findIndex(s => s.id === id); if (idx >= 0) schoolOptions.splice(idx,1); render();
  }));
  document.querySelectorAll('[data-action="delete-teacher"]').forEach(btn => btn.addEventListener('click', () => {
    const id = Number(btn.dataset.id); const idx = teacherOptions.findIndex(t => t.id === id); if (idx >= 0) teacherOptions.splice(idx,1); render();
  }));
}

render();
