import { useNavigate } from "react-router-dom";

export default function HomeCard({ title, desc, icon, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="home-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <h3>
        {icon} {title}
      </h3>
      <p>{desc}</p>
    </div>
  );
}
