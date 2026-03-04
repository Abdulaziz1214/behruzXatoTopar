import { useState } from "react";

const GRID = 6;
const CELL = 38;
const OFF = GRID * CELL;
const SZ = OFF * 2 + CELL;

function CoordGrid({ points = [], lines = [], color = "#6366f1", showLabels = true }) {
  const px = (v) => OFF + v * CELL;
  const py = (v) => OFF - v * CELL;
  return (
    <svg width={SZ} height={SZ} style={{ display: "block", margin: "0 auto", maxWidth: "100%" }}>
      {Array.from({ length: GRID * 2 + 1 }, (_, i) => i - GRID).map(v => (
        <g key={v}>
          <line x1={px(v)} y1={0} x2={px(v)} y2={SZ} stroke={v === 0 ? "#334155" : "#e2e8f0"} strokeWidth={v === 0 ? 2 : 1} />
          <line x1={0} y1={py(v)} x2={SZ} y2={py(v)} stroke={v === 0 ? "#334155" : "#e2e8f0"} strokeWidth={v === 0 ? 2 : 1} />
          {v !== 0 && <>
            <text x={px(v)} y={py(0) + 14} textAnchor="middle" fontSize="10" fill="#94a3b8">{v}</text>
            <text x={px(0) + 10} y={py(v) + 4} fontSize="10" fill="#94a3b8">{v}</text>
          </>}
        </g>
      ))}
      <text x={SZ - 12} y={py(0) + 5} fontSize="13" fill="#334155" fontWeight="bold">x</text>
      <text x={px(0) + 5} y={10} fontSize="13" fill="#334155" fontWeight="bold">y</text>
      {lines.map((seg, i) => (
        <line key={i} x1={px(seg[0])} y1={py(seg[1])} x2={px(seg[2])} y2={py(seg[3])}
          stroke={color} strokeWidth={1.5} strokeDasharray="4,3" opacity={0.5} />
      ))}
      {points.map((pt, i) => (
        <g key={i}>
          <circle cx={px(pt.x)} cy={py(pt.y)} r={5} fill={pt.color || color} stroke="white" strokeWidth={2} />
          {showLabels && <>
            <text x={px(pt.x) + 8} y={py(pt.y) - 6} fontSize="11" fontWeight="bold" fill={pt.color || color}>{pt.label}</text>
            <text x={px(pt.x) + 8} y={py(pt.y) + 7} fontSize="9" fill="#64748b">({pt.x},{pt.y})</text>
          </>}
        </g>
      ))}
    </svg>
  );
}

const TASKS = [
  {
    id: 1, icon: "⚓", level: "🟢", tag: "Базовый",
    title: "Морское путешествие",
    color: "#0ea5e9",
    desc: "Корабль движется между островами. Нанеси острова на координатную плоскость и ответь на вопросы.",
    points: [
      { label: "Краб", x: 2, y: 5 }, { label: "Пальма", x: -4, y: 3 },
      { label: "Вулкан", x: -3, y: -4 }, { label: "Маяк", x: 4, y: -2 },
      { label: "Жемчуг", x: 0, y: -3 }, { label: "Порт", x: -1, y: 0 },
    ],
    questions: [
      { q: "В каком квадранте остров Краб(2,5)?", a: "I квадрант (x>0, y>0)" },
      { q: "Какие острова находятся левее оси Oy?", a: "Пальма(-4,3), Вулкан(-3,-4), Порт(-1,0) — у них x<0" },
      { q: "Какой остров лежит на оси Ox?", a: "Жемчуг(0,-3) лежит на оси Oy (x=0), ни один не лежит на Ox точно" },
      { q: "Найди расстояние от Маяка до оси Oy", a: "Расстояние = |x| = |4| = 4 единицы" },
      { q: "Найди точку, симметричную Вулкану(-3,-4) относительно оси Ox", a: "(-3, +4) — координата y меняет знак" },
    ],
  },
  {
    id: 2, icon: "🧩", level: "🟢", tag: "Базовый",
    title: "Кто где живёт?",
    color: "#10b981",
    desc: "На карте района оси проходят через школу. Определи адреса (координаты) зданий и заполни таблицу квадрантов.",
    points: [
      { label: "🏠 Алия", x: 3, y: 4 }, { label: "🏠 Боря", x: -5, y: 2 },
      { label: "🏠 Вика", x: -2, y: -3 }, { label: "🏠 Гена", x: 4, y: -5 },
      { label: "🏫 Школа", x: 0, y: 0 }, { label: "🏪 Магазин", x: 2, y: 0 },
    ],
    questions: [
      { q: "Запиши координаты каждого ученика", a: "Алия(3,4), Боря(-5,2), Вика(-2,-3), Гена(4,-5)" },
      { q: "Кто живёт дальше всего от школы по оси Ox?", a: "Боря: расстояние |−5|=5 единиц" },
      { q: "Кто из учеников — соседи по квадранту?", a: "Никто: каждый в своём квадранте (I, II, III, IV)" },
      { q: "Магазин находится на оси. На какой именно?", a: "На оси Ox, так как y=0" },
      { q: "Постройте точку K — середину отрезка Алия-Гена", a: "K = ((3+4)/2, (4+(−5))/2) = (3.5, −0.5)" },
    ],
  },
  {
    id: 3, icon: "🎮", level: "🟡", tag: "Средний",
    title: "Игра в шахматы координат",
    color: "#f59e0b",
    desc: "Фигуры стоят на координатной плоскости. Выполняй ходы и отслеживай новые координаты.",
    points: [
      { label: "♟ Конь", x: -2, y: 1, color: "#f59e0b" },
      { label: "♟ Слон", x: 3, y: -2, color: "#f59e0b" },
      { label: "♟ Ладья", x: -4, y: -3, color: "#f59e0b" },
    ],
    questions: [
      { q: "Конь делает ход: +3 по x и -2 по y. Где окажется?", a: "(-2+3, 1-2) = (1, -1) — IV квадрант" },
      { q: "Слон идёт симметрично оси Oy. Новые координаты?", a: "(-3, -2) — x меняет знак" },
      { q: "Ладья движется вертикально вверх на 5 клеток", a: "(-4, -3+5) = (-4, 2) — перешла из III во II квадрант!" },
      { q: "Какая фигура ближе всего к началу координат?", a: "Конь: расстояние ≈ √(4+1) ≈ 2.2; Слон ≈ √(9+4) ≈ 3.6; Ладья ≈ √(16+9) = 5" },
      { q: "★ Придумай ход, чтобы Ладья попала точно на ось Ox", a: "Нужно пройти 3 клетки вверх: (-4, -3+3) = (-4, 0)" },
    ],
  },
  {
    id: 4, icon: "🌿", level: "🟡", tag: "Средний",
    title: "Архитектор парка",
    color: "#8b5cf6",
    desc: "Ты проектируешь парк на координатной плоскости. Объекты должны быть симметричны и правильно расположены.",
    points: [
      { label: "🌲 Ель A", x: -3, y: 4 }, { label: "⛲ Фонтан", x: 0, y: 0 },
      { label: "🪑 Скамья", x: 2, y: -2 }, { label: "🌸 Клумба", x: -1, y: -4 },
    ],
    questions: [
      { q: "Посади симметричную ель A' относительно Oy", a: "A'(3, 4) — x меняет знак, y остаётся" },
      { q: "Посади ель A'' симметрично относительно начала координат", a: "A''(3, -4) — оба знака меняются" },
      { q: "Найди периметр прямоугольника с вершинами (-3,4),(3,4),(3,-4),(-3,-4)", a: "Стороны: 6 и 8. Периметр = 2×(6+8) = 28 единиц" },
      { q: "Скамья и клумба — в каких квадрантах? Есть ли у них симметрия?", a: "Скамья IV квадрант, Клумба III квадрант. Симметричны относительно оси Oy: (2,-2) и (-2,-2)≠(-1,-4)" },
      { q: "★ Разработай маршрут прогулки через все 4 точки, начиная с фонтана", a: "Фонтан(0,0) → Ель(-3,4) → Скамья(2,-2) → Клумба(-1,-4) и обратно" },
    ],
  },
  {
    id: 5, icon: "🔬", level: "🔴", tag: "Сложный",
    title: "Графики движения",
    color: "#ef4444",
    desc: "Два объекта движутся по координатной плоскости. Проследи их пути и найди точку встречи.",
    points: [
      { label: "🚀 Старт A", x: -5, y: 2, color: "#ef4444" },
      { label: "🛸 Старт B", x: 3, y: -4, color: "#3b82f6" },
    ],
    lines: [[-5, 2, 1, 2], [3, -4, 3, 2], [1, 2, 3, 2]],
    questions: [
      { q: "Объект A движется: каждый шаг +2 по x. Запиши 4 точки пути", a: "(-5,2) → (-3,2) → (-1,2) → (1,2) → (3,2)" },
      { q: "Объект B движется: каждый шаг +2 по y. Запиши 4 точки пути", a: "(3,-4) → (3,-2) → (3,0) → (3,2)" },
      { q: "В какой точке они встретятся?", a: "Точка (3, 2) — A дошёл по y=2, B дошёл по x=3" },
      { q: "Сколько шагов сделал каждый до встречи?", a: "A: 4 шага (по 2 единицы = 8 единиц); B: 3 шага (по 2 единицы = 6 единиц)" },
      { q: "★ В каких квадрантах побывал каждый объект на пути?", a: "A: II квадрант(-5,2)→(-3,2)→(-1,2), ось Oy(-1,2)→(1,2), I квадрант→(3,2). B: IV квадрант→ось Ox(3,0)→I квадрант" },
    ],
  },
  {
    id: 6, icon: "🏆", level: "⭐", tag: "Олимпийский",
    title: "Тайное послание",
    color: "#ec4899",
    desc: "Нанеси точки, соедини по порядку — получишь зашифрованную букву! Используй все знания темы.",
    points: [
      { label: "1", x: -2, y: 4 }, { label: "2", x: 2, y: 4 },
      { label: "3", x: 2, y: 1 }, { label: "4", x: -2, y: 1 },
      { label: "5", x: -2, y: -2 }, { label: "6", x: 2, y: -2 },
      { label: "7", x: 0, y: 1 }, { label: "8", x: 0, y: 4 },
    ],
    lines: [[-2,4],[2,4],[2,4],[2,1],[2,1],[-2,1],[-2,1],[-2,-2],[-2,-2],[2,-2],[0,1],[0,4]].reduce((acc, _, i, arr) => {
      if (i % 2 === 0 && i + 1 < arr.length) acc.push([arr[i][0], arr[i][1], arr[i+1][0], arr[i+1][1]]);
      return acc;
    }, []),
    questions: [
      { q: "Какая буква получилась при соединении точек 1→2→3→4→5→6?", a: "Буква «Е» (или «З»)" },
      { q: "Запиши все точки, которые лежат в I квадранте", a: "(2,4), (2,1) — x>0 и y>0" },
      { q: "Найди точки, симметричные точкам 1 и 2 относительно оси Ox", a: "1'(-2,-4) и 2'(2,-4)" },
      { q: "★ Придумай свою букву из 6+ точек. Запиши координаты", a: "Творческое задание!" },
      { q: "★★ Создай слово из 3 букв используя координаты — подари однокласснику для разгадки!", a: "Групповое/домашнее задание" },
    ],
  },
];

function TaskCard({ task }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState({});
  const toggle = (i) => setRevealed(r => ({ ...r, [i]: !r[i] }));

  const levelColors = { "🟢": "#10b981", "🟡": "#f59e0b", "🔴": "#ef4444", "⭐": "#ec4899" };

  return (
    <div style={{
      background: "white", borderRadius: 18,
      border: `2px solid ${open ? task.color : "#f1f5f9"}`,
      marginBottom: 16, overflow: "hidden",
      boxShadow: open ? `0 6px 24px ${task.color}25` : "0 2px 6px rgba(0,0,0,0.05)",
      transition: "all 0.25s",
    }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "16px 20px", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 14,
        background: open ? `${task.color}08` : "white",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: `${task.color}18`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0,
        }}>{task.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: levelColors[task.level], background: `${levelColors[task.level]}15`, padding: "2px 8px", borderRadius: 20 }}>
              {task.level} {task.tag}
            </span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#1e293b" }}>{task.title}</div>
        </div>
        <div style={{ fontSize: 18, color: task.color, transition: "0.2s", transform: open ? "rotate(180deg)" : "none" }}>▾</div>
      </div>

      {open && (
        <div style={{ padding: "0 20px 20px" }}>
          <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>{task.desc}</p>
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: 12, marginBottom: 16 }}>
            <CoordGrid points={task.points} lines={task.lines || []} color={task.color} />
          </div>
          <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10, fontSize: 15 }}>Вопросы и задания:</div>
          {task.questions.map((item, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div onClick={() => toggle(i)} style={{
                padding: "10px 14px", background: "#f8fafc", borderRadius: 10,
                cursor: "pointer", display: "flex", gap: 10, alignItems: "flex-start",
                border: revealed[i] ? `1.5px solid ${task.color}` : "1.5px solid transparent",
              }}>
                <span style={{
                  minWidth: 22, height: 22, background: task.color, borderRadius: 6,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>{i + 1}</span>
                <span style={{ flex: 1, fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{item.q}</span>
                <span style={{ fontSize: 11, color: "#94a3b8", flexShrink: 0 }}>{revealed[i] ? "▲" : "▼"}</span>
              </div>
              {revealed[i] && (
                <div style={{
                  marginTop: 3, padding: "9px 14px 9px 46px",
                  background: `${task.color}10`, borderRadius: 10,
                  fontSize: 13, color: "#1e293b", borderLeft: `3px solid ${task.color}`,
                }}>✅ {item.a}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const tags = ["all", "🟢 Базовый", "🟡 Средний", "🔴 Сложный", "⭐ Олимпийский"];
  const filtered = TASKS.filter(t => filter === "all" || `${t.level} ${t.tag}` === filter);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0f9ff, #fdf4ff)", padding: "24px 16px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 6 }}>🗺️</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1e293b", margin: "0 0 6px" }}>
            Декартова система координат
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>6 заданий · 7 класс · Классная работа</p>
        </div>

        {/* Quadrant reference */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {[["II", "−x, +y", "#8b5cf6"], ["I", "+x, +y", "#10b981"], ["III", "−x, −y", "#f59e0b"], ["IV", "+x, −y", "#ef4444"]].map(([q, c, col]) => (
            <div key={q} style={{ background: "white", borderRadius: 12, padding: "10px 8px", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", borderTop: `3px solid ${col}` }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: col }}>{q}</div>
              <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>{c}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {tags.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              background: filter === t ? "#6366f1" : "white",
              color: filter === t ? "white" : "#475569",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}>{t === "all" ? "Все задания" : t}</button>
          ))}
        </div>

        {filtered.map(task => <TaskCard key={task.id} task={task} />)}

        <div style={{ background: "white", borderRadius: 16, padding: 20, marginTop: 8, border: "1px solid #e2e8f0" }}>
          <div style={{ fontWeight: 800, color: "#1e293b", marginBottom: 12, fontSize: 15 }}>📌 Ключевые формулы</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["Симметрия по Ox", "M(x,y) → M'(x, −y)"],
              ["Симметрия по Oy", "M(x,y) → M'(−x, y)"],
              ["Симметрия по O(0,0)", "M(x,y) → M'(−x, −y)"],
              ["Расстояние до Ox", "|y| — модуль ординаты"],
              ["Расстояние до Oy", "|x| — модуль абсциссы"],
              ["Середина отрезка", "((x₁+x₂)/2, (y₁+y₂)/2)"],
            ].map(([name, val]) => (
              <div key={name} style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", marginBottom: 2 }}>{name}</div>
                <div style={{ fontSize: 13, color: "#374151", fontFamily: "monospace" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}