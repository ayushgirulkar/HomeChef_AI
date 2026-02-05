import HomeCard from "../components/HomeCard";

export default function Home() {
  return (
    <div className="page">

      {/* ===== BRAND HEADER ===== */}
      <div className="home-brand">
        <img
          src="/newlogo.png"
          alt="HomeChef Logo"
          className="home-logo"
        />

        <h2 className="home-title">
          Home<span>Chef</span>
        </h2>
      </div>

      <p className="home-subtitle">
        👋 Welcome to HomeChef AI <br />
        Cook smarter • Eat healthier • Powered by AI
      </p>

      {/* ===== CARDS ===== */}
      <HomeCard
        icon="🍳"
        title="Let’s Cook"
        desc="Generate recipes instantly by dish name"
        path="/lets-cook"
      />

      <HomeCard
        icon="🥕"
        title="Smart Ingredients"
        desc="Upload image or type ingredients to get recipes"
        path="/ingredients"
      />

      <HomeCard
        icon="🏋️"
        title="Gym Freak Planner"
        desc="AI-powered weekly fitness meal plans"
        path="/gym"
      />

      <HomeCard
        icon="🛒"
        title="Buy Products"
        desc="AI-powered Searching"
        path="/store"
      />
    </div>
  );
}
