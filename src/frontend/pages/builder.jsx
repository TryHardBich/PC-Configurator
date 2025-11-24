import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/builder.css";

export default function Builder() {
  const [cpuOptions, setCpuOptions] = useState([]);
  const [gpuOptions, setGpuOptions] = useState([]);
  const [ramOptions, setRamOptions] = useState([]);
  const [storageOptions, setStorageOptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Фильтры
  const [cpuFilter, setCpuFilter] = useState("all");
  const [gpuFilter, setGpuFilter] = useState("all");
  const [ramFilter, setRamFilter] = useState("all");
  const [storageFilter, setStorageFilter] = useState("all");

  // Выбранные комплектующие
  const [cpu, setCpu] = useState(null);
  const [gpu, setGpu] = useState(null);
  const [ram, setRam] = useState(null);
  const [storage, setStorage] = useState(null);

  // Загружаем данные из backend'а при загрузке страницы
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [cpuRes, gpuRes, ramRes, storageRes] = await Promise.all([
          fetch("http://localhost:3000/api/parts?type=cpu"),
          fetch("http://localhost:3000/api/parts?type=gpu"),
          fetch("http://localhost:3000/api/parts?type=ram"),
          fetch("http://localhost:3000/api/parts?type=storage"),
        ]);

        const cpuData = await cpuRes.json();
        const gpuData = await gpuRes.json();
        const ramData = await ramRes.json();
        const storageData = await storageRes.json();

        setCpuOptions(cpuData);
        setGpuOptions(gpuData);
        setRamOptions(ramData);
        setStorageOptions(storageData);

        console.log("✅ Данные загружены:");
        console.log("   CPU:", cpuData.length);
        console.log("   GPU:", gpuData.length);
        console.log("   RAM:", ramData.length);
        console.log("   Storage:", storageData.length);
      } catch (e) {
        console.error("❌ Ошибка загрузки:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Фильтрация и сортировка для CPU
  const filteredCpu = cpuOptions
    .filter((c) => {
      if (cpuFilter === "intel") return c.manufacturer === "Intel";
      if (cpuFilter === "amd") return c.manufacturer === "AMD";
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Фильтрация и сортировка для GPU
  const filteredGpu = gpuOptions
    .filter((g) => {
      if (gpuFilter === "nvidia") return g.manufacturer === "NVIDIA";
      if (gpuFilter === "amd") return g.manufacturer === "AMD";
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Фильтрация и сортировка для RAM
  const filteredRam = ramOptions
    .filter((r) => {
      if (ramFilter === "kingston") return r.manufacturer === "Kingston";
      if (ramFilter === "corsair") return r.manufacturer === "Corsair";
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Фильтрация и сортировка для Storage
  const filteredStorage = storageOptions
    .filter((s) => {
      if (storageFilter === "samsung") return s.manufacturer === "Samsung";
      if (storageFilter === "wd") return s.manufacturer === "WD";
      if (storageFilter === "seagate") return s.manufacturer === "Seagate";
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const totalPrice =
    (cpu?.price || 0) +
    (gpu?.price || 0) +
    (ram?.price || 0) +
    (storage?.price || 0);

  if (loading) {
    return (
      <div className="builder-page">
        <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
          ⏳ Загружаю комплектующие...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="builder-page">
        <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
          ❌ Ошибка: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="builder-page">
      <header className="header">
        <Link
          to="/"
          className="logo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Configurator
        </Link>
      </header>

      <main className="builder-main">
        {/* ПРОЦЕССОР */}
        <section className="builder-section">
          <h2>CPU ({filteredCpu.length})</h2>
          <div className="filter-buttons">
            <button
              type="button"
              className={
                cpuFilter === "all" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setCpuFilter("all")}
            >
              Все
            </button>
            <button
              type="button"
              className={
                cpuFilter === "intel" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setCpuFilter("intel")}
            >
              Intel
            </button>
            <button
              type="button"
              className={
                cpuFilter === "amd" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setCpuFilter("amd")}
            >
              AMD
            </button>
          </div>
          <select
            name="cpu"
            value={cpu?.id || ""}
            onChange={(e) =>
              setCpu(
                filteredCpu.find((c) => c.id === Number(e.target.value)) ||
                  null,
              )
            }
          >
            <option value="">Выбери процессор</option>
            {filteredCpu.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.price.toLocaleString()} ₽
              </option>
            ))}
          </select>
        </section>

        {/* ВИДЕОКАРТА */}
        <section className="builder-section">
          <h2>GPU ({filteredGpu.length})</h2>
          <div className="filter-buttons">
            <button
              type="button"
              className={
                gpuFilter === "all" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setGpuFilter("all")}
            >
              Все
            </button>
            <button
              type="button"
              className={
                gpuFilter === "nvidia" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setGpuFilter("nvidia")}
            >
              NVIDIA
            </button>
            <button
              type="button"
              className={
                gpuFilter === "amd" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setGpuFilter("amd")}
            >
              AMD
            </button>
          </div>
          <select
            name="gpu"
            value={gpu?.id || ""}
            onChange={(e) =>
              setGpu(
                filteredGpu.find((g) => g.id === Number(e.target.value)) ||
                  null,
              )
            }
          >
            <option value="">Выбери видеокарту</option>
            {filteredGpu.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} — {g.price.toLocaleString()} ₽
              </option>
            ))}
          </select>
        </section>

        {/* ОПЕРАТИВНАЯ ПАМЯТЬ */}
        <section className="builder-section">
          <h2>RAM ({filteredRam.length})</h2>
          <div className="filter-buttons">
            <button
              type="button"
              className={
                ramFilter === "all" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setRamFilter("all")}
            >
              Все
            </button>
            <button
              type="button"
              className={
                ramFilter === "kingston" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setRamFilter("kingston")}
            >
              Kingston
            </button>
            <button
              type="button"
              className={
                ramFilter === "corsair" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setRamFilter("corsair")}
            >
              Corsair
            </button>
          </div>
          <select
            name="ram"
            value={ram?.id || ""}
            onChange={(e) =>
              setRam(
                filteredRam.find((r) => r.id === Number(e.target.value)) ||
                  null,
              )
            }
          >
            <option value="">Выбери память</option>
            {filteredRam.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.price.toLocaleString()} ₽
              </option>
            ))}
          </select>
        </section>

        {/* НАКОПИТЕЛЬ */}
        <section className="builder-section">
          <h2>STORAGE ({filteredStorage.length})</h2>
          <div className="filter-buttons">
            <button
              type="button"
              className={
                storageFilter === "all" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setStorageFilter("all")}
            >
              Все
            </button>
            <button
              type="button"
              className={
                storageFilter === "samsung" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setStorageFilter("samsung")}
            >
              Samsung
            </button>
            <button
              type="button"
              className={
                storageFilter === "wd" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setStorageFilter("wd")}
            >
              WD
            </button>
            <button
              type="button"
              className={
                storageFilter === "seagate" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setStorageFilter("seagate")}
            >
              Seagate
            </button>
          </div>
          <select
            name="storage"
            value={storage?.id || ""}
            onChange={(e) =>
              setStorage(
                filteredStorage.find((s) => s.id === Number(e.target.value)) ||
                  null,
              )
            }
          >
            <option value="">Выбери накопитель</option>
            {filteredStorage.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.price.toLocaleString()} ₽
              </option>
            ))}
          </select>
        </section>

        {/* ИТОГОВАЯ СБОРКА */}
        <section className="builder-summary">
          <h2>Итоговая сборка</h2>
          <ul>
            <li>
              <strong>CPU:</strong> {cpu ? cpu.name : " Не выбрано"}
            </li>
            <li>
              <strong>GPU:</strong> {gpu ? gpu.name : " Не выбрано"}
            </li>
            <li>
              <strong>RAM:</strong> {ram ? ram.name : " Не выбрано"}
            </li>
            <li>
              <strong>STORAGE:</strong> {storage ? storage.name : " Не выбрано"}
            </li>
          </ul>
          <div className="builder-total">
            Итого: <strong>{totalPrice.toLocaleString()} ₽</strong>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 PC Configurator. Все права защищены.</p>
      </footer>
    </div>
  );
}
