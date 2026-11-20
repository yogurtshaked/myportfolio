
const Butterfly = ({ variant = 0 }) => {
    const colors = [
        {
            upper: "#D9A9B8",
            lower: "#EBCBD2",
            stroke: "#A77D8B",
        },
        {
            upper: "#B9A9C9",
            lower: "#D6C9DF",
            stroke: "#8D7B9E",
        },
        {
            upper: "#D9C5A2",
            lower: "#F0DFBF",
            stroke: "#AD9574",
        },
    ];

    const color = colors[variant % colors.length];

    return (
        <svg
            className="butterfly-svg"
            viewBox="0 0 48 40"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Left wings */}
            <g className="butterfly-wing butterfly-wing-left">
                <path
                    d="M22 19
                       C17 8, 5 1, 3 9
                       C0 18, 10 26, 22 22
                       C17 27, 12 35, 17 37
                       C23 38, 26 27, 24 21 Z"
                    fill={color.upper}
                    stroke={color.stroke}
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                />
            </g>

            {/* Right wings */}
            <g className="butterfly-wing butterfly-wing-right">
                <path
                    d="M26 19
                       C31 8, 43 1, 45 9
                       C48 18, 38 26, 26 22
                       C31 27, 36 35, 31 37
                       C25 38, 22 27, 24 21 Z"
                    fill={color.lower}
                    stroke={color.stroke}
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                />
            </g>

            {/* Butterfly body */}
            <path
                d="M24 15 C21 21, 22 28, 24 31
                   C26 28, 27 21, 24 15Z"
                fill={color.stroke}
            />

            {/* Antennae */}
            <path
                d="M23 16 Q17 7 15 10 M25 16 Q31 7 33 10"
                stroke={color.stroke}
                strokeWidth="0.8"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Butterfly;
