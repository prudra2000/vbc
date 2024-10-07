const DigiMeLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 216 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="6"
          y="6"
          width="204"
          height="116"
          rx="18"
          stroke="#0D47A1"
          strokeWidth="11"
        />
        <circle cx="62.5" cy="50.5" r="17" stroke="#0D47A1" strokeWidth="11" />
        <path
          d="M34 100V96C34 80.536 46.536 68 62 68V68V68C77.464 68 90 80.536 90 96V100"
          stroke="#0D47A1"
          strokeWidth="11"
        />
        <rect x="116" y="41" width="75" height="12" rx="6" fill="#0D47A1" />
        <rect x="116" y="58" width="58" height="12" rx="6" fill="#0D47A1" />
        <rect x="116" y="75" width="41" height="12" rx="6" fill="#0D47A1" />
      </svg>

      <h1 className="text-xl font-bold text-blue-800 font-poppins">DigiMe</h1>
    </div>
  );
};

export default DigiMeLogo;