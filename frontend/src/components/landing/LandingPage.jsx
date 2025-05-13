import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const [move, setMove] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMove((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const hasSearch =
      searchParams.from.trim() || searchParams.to.trim() || searchParams.date;

    if (!hasSearch) {
      toast.warn("Please fill in the search field");
      return;
    }

    const params = {};

    if (searchParams.from.trim()) {
      params.origin = searchParams.from.trim();
    }

    if (searchParams.to.trim()) {
      params.destination = searchParams.to.trim();
    }

    if (searchParams.date) {
      params.date = new Date(searchParams.date).toISOString();
    }

    navigate("/rides", { state: params });
  };

  return (
    <>
      <div className="relative overflow-hidden min-h-[700px] flex items-center mt-16 px-24">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              opacity: "1",
              willChange: "opacity, transform",
              transform: "none",
            }}
          >
            <img
              alt="People carpooling on a scenic Indian road"
              decoding="async"
              data-nimg="fill"
              className="object-cover"
              src="/bg.jpg"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/70"></div>
          </div>

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <g>
              <circle
                cx="200"
                cy="450"
                r="6"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="200px 450px"
                style={{ transform: "none", transformOrigin: "200px 450px" }}
              ></circle>{" "}
              <text
                x="210"
                y="440"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Mumbai
              </text>
            </g>
            <g>
              <circle
                cx="350"
                cy="250"
                r="4"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="350px 250px"
                style={{ transform: "none", transformOrigin: "350px 250px" }}
              ></circle>
              <text
                x="360"
                y="240"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Delhi
              </text>
            </g>
            <g>
              <circle
                cx="300"
                cy="550"
                r="4"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="300px 550px"
                style={{ transform: "none", transformOrigin: "300px 550px" }}
              ></circle>
              <text
                x="310"
                y="540"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Bangalore
              </text>
            </g>
            <g>
              <circle
                cx="400"
                cy="600"
                r="6"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="400px 600px"
                style={{ transform: "none", transformOrigin: " 400px 600px" }}
              ></circle>
              <text
                x="410"
                y="590"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Chennai
              </text>
            </g>
            <g>
              <circle
                cx="550"
                cy="300"
                r="4"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="550px 300px"
                style={{ transform: "none", transformOrigin: "550px 300px" }}
              ></circle>
              <text
                x="560"
                y="290"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Kolkata
              </text>
            </g>
            <g>
              <circle
                cx="350"
                cy="500"
                r="4"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="350px 500px"
                style={{ transform: "none", transformOrigin: "350px 500px" }}
              ></circle>
              <text
                x="360"
                y="490"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Hyderabad
              </text>
            </g>
            <g>
              <circle
                cx="250"
                cy="480"
                r="6"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="250px 480px"
                style={{ transform: "none", transformOrigin: "250px 480px" }}
              ></circle>
              <text
                x="260"
                y="470"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Pune
              </text>
            </g>
            <g>
              <circle
                cx="180"
                cy="350"
                r="4"
                fill="rgba(255,255,255,0.7)"
                opacity="1"
                transform-origin="180px 350px"
                style={{ transform: "none", transformOrigin: "180px 350px" }}
              ></circle>
              <text
                x="190"
                y="340"
                fontSize="12"
                fill="rgba(255,255,255,0.8)"
                opacity="1"
              >
                Ahmedabad
              </text>
            </g>
            <g>
              <path
                d="M200,450 L350,250"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#10b981"
                filter="drop-shadow(0 0 3px #10b981)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#10b981"
                filter="drop-shadow(0 0 4px #10b981)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-0"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#10b981"
                filter="drop-shadow(0 0 5px #10b981)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#10b981"
                filter="drop-shadow(0 0 3px #10b981)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: "0px 0px" }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-0"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#10b981"
                filter="drop-shadow(0 0 4px #10b981)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#10b981"
                filter="drop-shadow(0 0 5px #10b981)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: "0px 0px" }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-0"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-0"
                d="M200,450 L350,250"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#10b981"
                filter="drop-shadow(0 0 10px #10b981)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0)", transformOrigin: "0px 0px" }}
              >
                <animateMotion
                  path="M200,450 L350,250"
                  dur="3s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
            <g>
              <path
                d="M300,550 L350,500"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#f59e0b"
                filter="drop-shadow(0 0 3px #f59e0b)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#f59e0b"
                filter="drop-shadow(0 0 4px #f59e0b)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-1"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#f59e0b"
                filter="drop-shadow(0 0 5px #f59e0b)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#f59e0b"
                filter="drop-shadow(0 0 3px #f59e0b)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: "0px 0px" }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-1"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#f59e0b"
                filter="drop-shadow(0 0 4px #f59e0b)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: "0px 0px",
                }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#f59e0b"
                filter="drop-shadow(0 0 5px #f59e0b)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: "0px 0px" }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-1"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-1"
                d="M300,550 L350,500"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#f59e0b"
                filter="drop-shadow(0 0 10px #f59e0b)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M300,550 L350,500"
                  dur="3s"
                  begin="2s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
            <g>
              <path
                d="M350,250 L550,300"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#3b82f6"
                filter="drop-shadow(0 0 3px #3b82f6)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#3b82f6"
                filter="drop-shadow(0 0 4px #3b82f6)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-2"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#3b82f6"
                filter="drop-shadow(0 0 5px #3b82f6)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#3b82f6"
                filter="drop-shadow(0 0 3px #3b82f6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-2"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#3b82f6"
                filter="drop-shadow(0 0 4px #3b82f6)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#3b82f6"
                filter="drop-shadow(0 0 5px #3b82f6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-2"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-2"
                d="M350,250 L550,300"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#3b82f6"
                filter="drop-shadow(0 0 10px #3b82f6)"
                opacity="0.4141086283052573"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.46012)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L550,300"
                  dur="3s"
                  begin="4s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
            <g>
              <path
                d="M200,450 L250,480"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#ec4899"
                filter="drop-shadow(0 0 3px #ec4899)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#ec4899"
                filter="drop-shadow(0 0 4px #ec4899)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-3"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#ec4899"
                filter="drop-shadow(0 0 5px #ec4899)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#ec4899"
                filter="drop-shadow(0 0 3px #ec4899)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-3"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#ec4899"
                filter="drop-shadow(0 0 4px #ec4899)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#ec4899"
                filter="drop-shadow(0 0 5px #ec4899)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-3"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-3"
                d="M200,450 L250,480"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#ec4899"
                filter="drop-shadow(0 0 10px #ec4899)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M200,450 L250,480"
                  dur="3s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
            <g>
              <path
                d="M400,600 L300,550"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 3px #8b5cf6)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 4px #8b5cf6)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-4"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 5px #8b5cf6)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 3px #8b5cf6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-4"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 4px #8b5cf6)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 5px #8b5cf6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-4"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-4"
                d="M400,600 L300,550"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#8b5cf6"
                filter="drop-shadow(0 0 10px #8b5cf6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M400,600 L300,550"
                  dur="3s"
                  begin="8s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
            <g>
              <path
                d="M350,250 L180,350"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#06b6d4"
                filter="drop-shadow(0 0 3px #06b6d4)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#06b6d4"
                filter="drop-shadow(0 0 4px #06b6d4)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-5"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#06b6d4"
                filter="drop-shadow(0 0 5px #06b6d4)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#06b6d4"
                filter="drop-shadow(0 0 3px #06b6d4)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-5"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#06b6d4"
                filter="drop-shadow(0 0 4px #06b6d4)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#06b6d4"
                filter="drop-shadow(0 0 5px #06b6d4)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-5"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-5"
                d="M350,250 L180,350"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#06b6d4"
                filter="drop-shadow(0 0 10px #06b6d4)"
                opacity="0.8991981139843119"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.99911)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,250 L180,350"
                  dur="3s"
                  begin="10s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
            <g>
              <path
                d="M350,500 L400,600"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeDasharray="1px 1px"
                opacity="1"
                pathLength="1"
                strokeDashoffset="0px"
              ></path>
              <circle
                r="3"
                fill="#14b8a6"
                filter="drop-shadow(0 0 3px #14b8a6)"
                opacity="0.24605551787244623"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="8s"
                  begin="0s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="4"
                fill="#14b8a6"
                filter="drop-shadow(0 0 4px #14b8a6)"
                opacity="0.5187936938600615"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(1.0594)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="10s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-6"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="5"
                fill="#14b8a6"
                filter="drop-shadow(0 0 5px #14b8a6)"
                opacity="0.31635709440743087"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="12s"
                  begin="3s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="3"
                fill="#14b8a6"
                filter="drop-shadow(0 0 3px #14b8a6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="14s"
                  begin="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-6"></mpath>
                </animateMotion>
              </circle>
              <circle
                r="4"
                fill="#14b8a6"
                filter="drop-shadow(0 0 4px #14b8a6)"
                opacity="0.28120630613993847"
                transform-origin="0px 0px"
                style={{
                  transform: "scale(0.940603)",
                  transformOrigin: " 0px 0px",
                }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="16s"
                  begin="6s"
                  repeatCount="indefinite"
                  rotate="auto"
                ></animateMotion>
              </circle>
              <circle
                r="5"
                fill="#14b8a6"
                filter="drop-shadow(0 0 5px #14b8a6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0.8)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="18s"
                  begin="7.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                >
                  <mpath xlinkHref="#route-path-6"></mpath>
                </animateMotion>
              </circle>
              <path
                id="route-path-6"
                d="M350,500 L400,600"
                stroke="none"
                fill="none"
              ></path>
              <circle
                r="5"
                fill="#14b8a6"
                filter="drop-shadow(0 0 10px #14b8a6)"
                opacity="0"
                transform-origin="0px 0px"
                style={{ transform: "scale(0)", transformOrigin: " 0px 0px" }}
              >
                <animateMotion
                  path="M350,500 L400,600"
                  dur="3s"
                  begin="12s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0.5;0.5"
                  keyTimes="0;1"
                  calcMode="linear"
                ></animateMotion>
              </circle>
            </g>
          </svg>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                style={{
                  opacity: 1,
                  willChange: "opacity transform",
                  transform: "none",
                }}
              >
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                  Community-driven carpooling for India
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Share rides,{" "}
                  <span className="relative inline-block">
                    connect
                    <svg
                      width="100%"
                      height="8"
                      viewBox="0 0 200 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -bottom-2 left-0"
                      style={{ opacity: 1 }}
                    >
                      <path
                        d="M1 5.5C20 2.5 50 1 100 1C160 1 180 6.5 199 1"
                        stroke="#ffffff"
                        strokeWidth="6"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>{" "}
                  journeys
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-lg">
                  Helping Others with Possible Move Approach — join our
                  community of travelers making transportation across India more
                  sustainable, affordable, and social.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div
                    style={{
                      opacity: 1,
                      willChange: "opacity, transform",
                      transform: "none",
                    }}
                  >
                    <a href="/find-rides">
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md px-8 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40">
                        Find a ride
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-right ml-2 h-4 w-4"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </button>
                    </a>
                  </div>
                  <div
                    style={{
                      opacity: 1,
                      willChange: "opacity, transform",
                      transform: "none",
                    }}
                  >
                    <a href="/offer-ride">
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md px-8 bg-emerald-600/90 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40">
                        Offer a ride
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-right ml-2 h-4 w-4"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 text-sm text-white/80"
                  style={{ opacity: 1, willChange: "opacity" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users h-4 w-4 text-emerald-300"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>
                    Join 500K+ community members already sharing rides across
                    India
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div
                className="relative"
                style={{
                  opacity: 1,
                  willChange: "opacity, transform",
                  transform: " none",
                }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 relative z-10">
                  {/* <p className="text-gray-600 mb-6">
                    Complete your profile first to book a ride{" "}
                    <span>
                      <button
                        className="text-blue-500 underline"
                        onClick={() => navigate("/profile")}
                      >
                        {" "}
                        click{" "}
                      </button>
                    </span>{" "}
                    to complete profile
                  </p> */}
                  <div className="flex gap-2 mb-6">
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => navigate("/find-rides")}
                    >
                      Find a ride
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent h-10 px-4 py-2 text-gray-600 hover:text-emerald-600"
                      onClick={() => navigate("/offer-ride")}
                    >
                      Offer a ride
                    </button>
                  </div>
                  <div
                    style={{
                      opacity: 1,
                      willChange: "opacity, transform",
                      transform: "none",
                    }}
                  >
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map-pin absolute left-3 top-3 h-5 w-5 text-emerald-600"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <input
                            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-gray-200 focus:border-emerald-500 transition-all hover:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                            placeholder="From"
                            required=""
                            type="text"
                            value={searchParams.from}
                            onChange={(e) =>
                              setSearchParams({
                                ...searchParams,
                                from: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map-pin absolute left-3 top-3 h-5 w-5 text-emerald-600"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <input
                            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-gray-200 focus:border-emerald-500 transition-all hover:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                            placeholder="To"
                            required=""
                            type="text"
                            value={searchParams.to}
                            onChange={(e) =>
                              setSearchParams({
                                ...searchParams,
                                to: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-calendar absolute left-3 top-3 h-5 w-5 text-emerald-600"
                          >
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          <input
                            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-gray-200 focus:border-emerald-500 transition-all hover:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                            placeholder="When"
                            required=""
                            type="date"
                            value={searchParams.date}
                            onChange={(e) =>
                              setSearchParams({
                                ...searchParams,
                                date: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-users absolute left-3 top-3 h-5 w-5 text-emerald-600"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          <input
                            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-gray-200 focus:border-emerald-500 transition-all hover:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
                            min="1"
                            max="8"
                            placeholder="Passengers"
                            required=""
                            type="number"
                            value={searchParams.passengers}
                            onChange={(e) =>
                              setSearchParams({
                                ...searchParams,
                                passengers: parseInt(e.target.value) || 1,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40"
                        type="submit"
                        onClick={handleSearch}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-search h-5 w-5 mr-2"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                        Find Rides
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            style={{
              opacity: 1,
              willChange: "opacity, transform",
              transform: "none",
            }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md">
              <p className="text-4xl font-bold mb-1 text-white">500K+</p>
              <p className="text-white/80">Active users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md">
              <p className="text-4xl font-bold mb-1 text-white">10M+</p>
              <p className="text-white/80">Rides shared</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md">
              <p className="text-4xl font-bold mb-1 text-white">30K+</p>
              <p className="text-white/80">Tons of CO₂ saved</p>
            </div>
          </div>
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80"
            style={{ opacity: 1, willChange: "opacity" }}
          >
            <p className="text-sm mb-2">Discover more</p>
            <div
              style={{
                willChange: "transform",
                transform: "translateY(0.0347341px)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-down h-6 w-6"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* how it works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
            style={{
              opacity: 1,
              willChange: "opacity, transform",
              transform: "none",
            }}
          >
            <h2 className="text-3xl font-bold mb-4">How Dorycar Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're offering a ride or looking for one, our platform
              makes it simple to connect and travel together.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ opacity: 1, willChange: "opacity" }}
          >
            <div
              className="relative"
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl shadow-md p-8 h-full border border-gray-100">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search h-7 w-7 text-emerald-600"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Search or Publish
                </h3>
                <p className="text-gray-600 mb-4">
                  Find available rides or offer your own by setting your route,
                  date, and preferences.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 mb-4">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Enter your starting point and destination
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Choose your travel date and time
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Set your preferences and requirements
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-8 w-8 text-emerald-300"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div
              className="relative"
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl shadow-md p-8 h-full border border-gray-100">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-message-square h-7 w-7 text-emerald-600"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Connect &amp; Confirm
                </h3>
                <p className="text-gray-600 mb-4">
                  Chat with potential travel companions and confirm your booking
                  or passengers.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 mb-4">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Message drivers or passengers directly
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Review profiles and ratings
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Secure your booking with easy payment
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right h-8 w-8 text-emerald-300"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl shadow-md p-8 h-full border border-gray-100">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-car h-7 w-7 text-emerald-600"
                    >
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Travel Together</h3>
                <p className="text-gray-600 mb-4">
                  Meet at the agreed location, enjoy the journey, and rate your
                  experience afterward.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 mb-4">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Meet at the designated pickup point
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Share the journey and make connections
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Rate and review your experience
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="mt-12 text-center"
            style={{
              opacity: 1,
              willChange: " opacity, transform",
              transform: "none",
            }}
          >
            <a href="/how-it-works">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Learn more about how it works
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-2 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* why choose dorycar */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
            style={{
              opacity: 1,
              willChange: " opacity, transform",
              transform: "none",
            }}
          >
            <h2 className="text-3xl font-bold mb-4">Why choose Dorycar?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're more than just a carpooling platform. We're building a
              community of travelers who share more than just rides.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ opacity: 1, willChange: " opacity" }}
          >
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 p-4 bg-emerald-100 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield h-6 w-6 text-emerald-600"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Safe &amp; Secure
                </h3>
                <p className="text-gray-600 mb-4">
                  Verified profiles, ratings, and our trust system ensures you
                  always travel with confidence.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    ID verification for all users
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Transparent rating system
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Secure payment processing
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 p-4 bg-emerald-100 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-dollar-sign h-6 w-6 text-emerald-600"
                  >
                    <line x1="12" x2="12" y1="2" y2="22"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Save Money</h3>
                <p className="text-gray-600 mb-4">
                  Split travel costs and save up to 75% compared to other
                  transportation options.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Share fuel and toll costs
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    No booking fees for regular users
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Cheaper than trains and buses
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 p-4 bg-emerald-100 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-leaf h-6 w-6 text-emerald-600"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Eco-Friendly</h3>
                <p className="text-gray-600 mb-4">
                  Reduce your carbon footprint by sharing rides and contributing
                  to a more sustainable future.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Reduce CO₂ emissions
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Track your environmental impact
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Support sustainable transportation
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 p-4 bg-emerald-100 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock h-6 w-6 text-emerald-600"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Travel</h3>
                <p className="text-gray-600 mb-4">
                  Find rides that fit your schedule or offer rides when it's
                  convenient for you.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Thousands of routes available
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Last-minute bookings
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Travel when it suits you
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 p-4 bg-emerald-100 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users h-6 w-6 text-emerald-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-gray-600 mb-4">
                  Connect with like-minded travelers and build meaningful
                  connections along the way.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Meet new people
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Share interests and experiences
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Build your network
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-8 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-6 p-4 bg-emerald-100 rounded-lg w-fit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-square h-6 w-6 text-emerald-600"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Easy Communication
                </h3>
                <p className="text-gray-600 mb-4">
                  Our built-in messaging system makes it simple to coordinate
                  with your travel companions.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    In-app messaging
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Real-time notifications
                  </li>
                  <li className="flex items-center">
                    <span className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Location sharing options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* making a difference */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Making a Difference Together
              </h2>
              <p className="text-lg text-white/80 mb-8">
                At Dorycar, we believe in the power of community to create
                positive change. Every shared ride contributes to a more
                sustainable future and brings people closer together.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-800 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-leaf h-6 w-6 text-emerald-300"
                    >
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Environmental Impact
                    </h3>
                    <p className="text-white/80">
                      By sharing rides, our community has saved over 30,000 tons
                      of CO₂ emissions. That's equivalent to planting 1.5
                      million trees!
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-800 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users h-6 w-6 text-emerald-300"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Social Connections
                    </h3>
                    <p className="text-white/80">
                      Dorycar has facilitated over 2 million new connections
                      between people who might never have met otherwise.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-800 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-car h-6 w-6 text-emerald-300"
                    >
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                      <circle cx="7" cy="17" r="2"></circle>
                      <path d="M9 17h6"></path>
                      <circle cx="17" cy="17" r="2"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Reduced Traffic
                    </h3>
                    <p className="text-white/80">
                      Our carpooling community has helped remove an estimated 3
                      million cars from roads, reducing congestion and travel
                      times.
                    </p>
                  </div>
                </div>
              </div>
              <a href="/impact">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 border-white text-white hover:bg-emerald-800">
                  Learn more about our impact
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </div>
            <div
              className="relative"
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <img
                  alt="People carpooling and making a positive impact"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="object-cover"
                  src="/img.png"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold mb-2">10M+</p>
                    <p className="text-sm">Shared journeys and counting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* popular routes */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
            style={{
              opacity: 1,
              willChange: " opacity, transform",
              transform: "none",
            }}
          >
            <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most traveled routes in our network and join
              thousands of others making these journeys together. Helping Others
              with Possible Move Approach.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ opacity: 1, willChange: " opacity" }}
          >
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <a href="/find-rides?from=Delhi&amp;to=Mumbai">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all hover:border-emerald-200 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-emerald-100 text-emerald-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Popular
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      ₹1,200
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Delhi</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Mumbai</p>
                      </div>
                    </div>
                    <div className="h-12 flex items-center">
                      <svg
                        width="24"
                        height="50"
                        viewBox="0 0 24 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L12 48"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="2 4"
                        ></path>
                        <circle cx="12" cy="2" r="2" fill="#059669"></circle>
                        <circle cx="12" cy="48" r="2" fill="#059669"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>1,400 km</div>
                    <div>260 rides/day</div>
                  </div>
                </div>
              </a>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <a href="/find-rides?from=Bangalore&amp;to=Chennai">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all hover:border-emerald-200 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-emerald-100 text-emerald-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Popular
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      ₹600
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Bangalore</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Chennai</p>
                      </div>
                    </div>
                    <div className="h-12 flex items-center">
                      <svg
                        width="24"
                        height="50"
                        viewBox="0 0 24 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L12 48"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="2 4"
                        ></path>
                        <circle cx="12" cy="2" r="2" fill="#059669"></circle>
                        <circle cx="12" cy="48" r="2" fill="#059669"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>350 km</div>
                    <div>220 rides/day</div>
                  </div>
                </div>
              </a>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <a href="/find-rides?from=Hyderabad&amp;to=Bangalore">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all hover:border-emerald-200 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-emerald-100 text-emerald-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Popular
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      ₹850
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Hyderabad</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Bangalore</p>
                      </div>
                    </div>
                    <div className="h-12 flex items-center">
                      <svg
                        width="24"
                        height="50"
                        viewBox="0 0 24 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L12 48"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="2 4"
                        ></path>
                        <circle cx="12" cy="2" r="2" fill="#059669"></circle>
                        <circle cx="12" cy="48" r="2" fill="#059669"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>570 km</div>
                    <div>190 rides/day</div>
                  </div>
                </div>
              </a>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <a href="/find-rides?from=Pune&amp;to=Mumbai">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all hover:border-emerald-200 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-emerald-100 text-emerald-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Popular
                    </div>
                    <div className="text-lg font-bold text-emerald-600">
                      ₹350
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Pune</p>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-map-pin h-4 w-4 text-emerald-600 mr-1"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <p className="font-medium">Mumbai</p>
                      </div>
                    </div>
                    <div className="h-12 flex items-center">
                      <svg
                        width="24"
                        height="50"
                        viewBox="0 0 24 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2L12 48"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="2 4"
                        ></path>
                        <circle cx="12" cy="2" r="2" fill="#059669"></circle>
                        <circle cx="12" cy="48" r="2" fill="#059669"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>150 km</div>
                    <div>300 rides/day</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div
            className="mt-12 text-center"
            style={{
              opacity: 1,
              willChange: "opacity, transform",
              transform: "none",
            }}
          >
            <a href="/popular-routes">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                Explore all popular routes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-2 h-4 w-4"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </section>
      {/* what our community says */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            className="text-center mb-16"
            style={{
              opacity: 1,
              willChange: " opacity, transform",
              transform: "none",
            }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed the way
              they travel with Dorycar.
            </p>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ opacity: 1, willChange: " opacity" }}
          >
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mr-4">
                    <img
                      className="aspect-square h-full w-full"
                      alt="Sarah Johnson"
                      src="https://sjc.microlink.io/bPmO-0fPcmARV8hkcbjlmB2SGx1eqnwjunD5j-lYOvqLmS83pqHSIrK1VV29P-BfuIYbhzBmzWVWy5AN4JW_Iw.jpeg"
                    />
                  </span>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">London</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "I've been using Dorycar for my weekly commute for 6 months
                  now. It's saved me money and I've made some great friends
                  along the way! The app is so easy to use and I feel safe with
                  the verification system."
                </p>
                <p className="text-sm text-emerald-600 font-medium">
                  Regular commuter • 50+ rides
                </p>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mr-4">
                    <img
                      className="aspect-square h-full w-full"
                      alt="Michael Chen"
                      src="https://sjc.microlink.io/bPmO-0fPcmARV8hkcbjlmB2SGx1eqnwjunD5j-lYOvqLmS83pqHSIrK1VV29P-BfuIYbhzBmzWVWy5AN4JW_Iw.jpeg"
                    />
                  </span>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-500">Manchester</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "As a driver, I love being able to offset my travel costs
                  while helping others and reducing my environmental impact. The
                  platform makes it easy to find reliable passengers and the
                  payment system is seamless."
                </p>
                <p className="text-sm text-emerald-600 font-medium">
                  Regular driver • 120+ rides offered
                </p>
              </div>
            </div>
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center mb-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mr-4">
                    <img
                      className="aspect-square h-full w-full"
                      alt="Priya Sharma"
                      src="https://sjc.microlink.io/bPmO-0fPcmARV8hkcbjlmB2SGx1eqnwjunD5j-lYOvqLmS83pqHSIrK1VV29P-BfuIYbhzBmzWVWy5AN4JW_Iw.jpeg"
                    />
                  </span>
                  <div>
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-gray-500">Birmingham</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-yellow-500 fill-yellow-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star h-4 w-4 text-gray-300"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-4">
                  "The platform is so easy to use, and the verification system
                  makes me feel safe when traveling with new people. I've used
                  Dorycar for both regular commutes and one-off longer journeys,
                  and it's been great for both."
                </p>
                <p className="text-sm text-emerald-600 font-medium">
                  Occasional traveler • 25+ rides
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* mobile app
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Mobile App
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Take Dorycar with you everywhere
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Download our mobile app to find and offer rides on the go. Get
                real-time notifications, chat with your travel companions, and
                manage your journeys from anywhere.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Real-time ride notifications and updates</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>In-app messaging with drivers and passengers</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Location sharing and navigation</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-emerald-100 p-1 rounded-full text-emerald-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check h-5 w-5"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Secure payments and transaction history</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white">
                  <img
                    alt="App Store"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2"
                    src="/images/app-store.png"
                    // style=""
                  />
                  App Store
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white">
                  <img
                    alt="Google Play"
                    loading="lazy"
                    width="24"
                    height="24"
                    decoding="async"
                    data-nimg="1"
                    className="mr-2"
                    src="/images/google-play.png"
                    // style=""
                  />
                  Google Play
                </button>
              </div>
            </div>
            <div
              className="relative"
              style={{
                opacity: 1,
                willChange: " opacity, transform",
                transform: "none",
              }}
            >
              <div className="relative h-[500px] md:h-[600px]">
                <div className="absolute top-0 right-0 w-[280px] h-[550px] z-20">
                  <div className="relative w-full h-full">
                    <img
                      alt="Dorycar mobile app"
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="object-contain rounded-3xl shadow-xl"
                      src="/images/app-screen-1.png"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: "0px",
                      }}
                    />
                  </div>
                </div>
                <div className="absolute top-10 right-[200px] w-[280px] h-[550px] z-10">
                  <div className="relative w-full h-full">
                    <img
                      alt="Dorycar mobile app"
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      className="object-contain rounded-3xl shadow-xl"
                      src="/images/app-screen-2.png"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        inset: "0px",
                      }}
                    />
                  </div>
                </div>
                <div className="absolute top-[10%] right-[10%] w-20 h-20 bg-emerald-100 rounded-full opacity-30"></div>
                <div className="absolute bottom-[20%] right-[30%] w-12 h-12 bg-emerald-200 rounded-full opacity-40"></div>
                <div className="absolute top-[40%] right-[5%] w-8 h-8 bg-emerald-300 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* start your journey */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div
            style={{
              opacity: 1,
              willChange: " opacity, transform",
              transform: "none",
            }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join our community today and experience a better way to travel.
              Share rides, save money, and make connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/find-rides">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 px-8 py-6 text-lg">
                  Find a ride
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>
              <a href="/offer-ride">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 bg-emerald-600/80 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 px-8 py-6 text-lg">
                  Offer a ride
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* footer section*/}
      <Footer />
    </>
  );
};
export default LandingPage;
