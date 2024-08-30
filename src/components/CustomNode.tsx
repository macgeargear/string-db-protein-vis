import { Handle, Position, NodeProps } from "@xyflow/react";

export interface CustomNodeData {
  label: string;
}

const CustomNode = ({ data, id, selected }: NodeProps<CustomNodeData>) => {
  return (
    <div
      className="relative w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center"
      onMouseEnter={() => data.onHover(id)}
      onMouseLeave={() => data.onHover(null)}
    >
      <span className="text-sm text-black">{data.label}</span>
      <Handle
        type="source"
        position={Position.Right}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        className="bg-green-500 bg-transparent border-none"
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        className="bg-red-500 bg-transparent border-none"
      />
    </div>
  );
};

export default CustomNode;
