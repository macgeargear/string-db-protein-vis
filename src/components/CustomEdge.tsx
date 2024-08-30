import React from "react";
import { EdgeProps, getEdgeCenter } from "@xyflow/react";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  data,
}) => {
  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const isHovered = data.hoveredNode === source || data.hoveredNode === target;

  return (
    <g>
      <line
        x1={sourceX}
        y1={sourceY}
        x2={targetX}
        y2={targetY}
        className={`${
          isHovered
            ? "stroke-blue-500 stroke-[4px]"
            : "stroke-gray-300 stroke-[2px]"
        }`}
      />
      {isHovered && (
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="text-xl text-black stroke-none"
        >
          {data.label}
        </text>
      )}
    </g>
  );
};

export default CustomEdge;
