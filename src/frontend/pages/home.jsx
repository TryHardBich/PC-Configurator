import "../styles/home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <header className="header">
        <h1 className="logo">ФЕДЯ УСТАЛ ЭТО 1 ДЕЛАТЬ ПОМОГИТЕ</h1>
      </header>

      <section className="hero">
        <h2 className="hero-title">Сборка ПК</h2>
        <p className="hero-text">
          Система автоматизации по подбору комплектующих.
        </p>
        <div className="hero-buttons">
          <Link to="/builder" className="btn-1">
            Начать сборку
          </Link>
          <Link to="/catalog" className="btn-2">
            Каталог комплектующих
          </Link>
          <Link to="/calculator" className="btn-3">
            Калькулятор блока питания
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 PC Configurator. Все права защищены.</p>
      </footer>
    </div>
  );
}
