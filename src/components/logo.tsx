const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 2000 2000"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#F8CC38", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#F5B945", stopOpacity: 1 }}
            />
          </linearGradient>
          <style>
            {`
      .cls-1 {
        fill: url(#gradient1); // Updated to use gradient
      }
      `}
          </style>
        </defs>
        <g>
          <g id="Layer_1">
            <polygon
              className="cls-1"
              points="1219.7 31.6 711.1 1033.9 969.6 913.3 705 1371.6 995.8 1236 773.2 1968.7 1284.3 965.1 1030.4 1083.5 1295 625.2 996.5 764.5 1219.7 31.6"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
