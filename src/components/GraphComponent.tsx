import React, { useState } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import { createGraphElements, arrangeNodesRadially } from "../lib/utils";

const ROOT_NODE_ID = "ARF5";

const GraphComponent: React.FC = () => {
  const { nodes: initialNodes, edges: initialEdges } = createGraphElements();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const rootNode = initialNodes.find((node) => node.id === ROOT_NODE_ID);
  const childNodes = initialNodes.filter((node) => node.id !== ROOT_NODE_ID);

  const arrangedNodes = rootNode
    ? [
        { ...rootNode, position: { x: 400, y: 300 } },
        ...arrangeNodesRadially(
          { ...rootNode, position: { x: 400, y: 300 } },
          childNodes.map((node, index) => ({
            id: node.id,
            radius: 800,
            angle: (index / childNodes.length) * 360,
            label: String(node.data.label),
          }))
        ),
      ]
    : initialNodes;

  const [nodes, , onNodesChange] = useNodesState<Node>(arrangedNodes);
  const [edges, , onEdgesChange] = useEdgesState<Edge>(initialEdges);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onHover: setHoveredNode,
          },
        }))}
        edges={edges.map((edge) => ({
          ...edge,
          data: { ...edge.data, hoveredNode },
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{ customNode: CustomNode }}
        edgeTypes={{ customEdge: CustomEdge }}
        nodesDraggable
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphComponent;
