const express = require("express");
const cors = require("cors");
const db = require("./db");

// Создаём сервер
const app = express();

// Разрешаем запросы с других портов (CORS)
app.use(cors());

// Разрешаем JSON
app.use(express.json());

console.log("🚀 Запускаю сервер...\n");

// ===== ГЛАВНЫЙ МАРШРУТ =====
// http://localhost:3000/api/parts?type=cpu
app.get("/api/parts", (req, res) => {
  try {
    const type = req.query.type;
    const parts = db
      .prepare(`
      SELECT id, type, name, price, manufacturer, socket, power
      FROM parts
      WHERE type = ?
    `)
      .all(type);

    console.log(
      `🔍 Запрос: /api/parts?type=${type} → ${parts.length} результатов`,
    );
    res.json(parts);
  } catch (e) {
    console.error("❌ Ошибка:", e.message);
    res.status(500).json({ error: "Failed to load parts" });
  }
});

// Вспомогательный маршрут для отладки
app.get("/api/debug", (req, res) => {
  try {
    const allParts = db.prepare("SELECT * FROM parts LIMIT 5").all();
    res.json({
      message: "Первые 5 комплектующих из БД",
      parts: allParts,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

// Стартуем сервер на порту 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log("════════════════════════════════════════════");
  console.log(`✅ API ЗАПУЩЕН на http://localhost:${PORT}`);
  console.log("════════════════════════════════════════════\n");
  console.log("📝 Примеры запросов:");
  console.log(`   • http://localhost:${PORT}/api/parts?type=cpu`);
  console.log(`   • http://localhost:${PORT}/api/parts?type=gpu`);
  console.log(`   • http://localhost:${PORT}/api/parts?type=ram`);
  console.log(`   • http://localhost:${PORT}/api/parts?type=storage`);
  console.log(`   • http://localhost:${PORT}/api/debug\n`);
});
