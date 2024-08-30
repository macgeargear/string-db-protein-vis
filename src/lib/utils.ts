import { Node, Edge } from "@xyflow/react";
import data from "../data/data.json";

export interface ProteinInteraction {
  protein1: string;
  protein2: string;
  combined_score: number;
  protein1_preferred_name: string;
  protein2_preferred_name: string;
}

export const createGraphElements = () => {
  const targetNodeName = "ARF5";

  const directChildren = new Set<string>(
    data
      .filter(
        (interaction) => interaction.protein1_preferred_name === targetNodeName
      )
      .map((interaction) => interaction.protein2_preferred_name)
  );

  const nodesToInclude = new Set<string>([targetNodeName, ...directChildren]);

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const incomingEdges = new Set<string>();

  data.forEach((interaction) => {
    const protein1Id = interaction.protein1_preferred_name;
    const protein2Id = interaction.protein2_preferred_name;

    incomingEdges.add(protein2Id);

    if (nodesToInclude.has(protein1Id) && nodesToInclude.has(protein2Id)) {
      if (!nodes.find((node) => node.id === protein1Id)) {
        nodes.push({
          id: protein1Id,
          data: { label: protein1Id },
          position: { x: Math.random() * 800, y: Math.random() * 800 },
          type: "customNode",
          className:
            protein1Id === targetNodeName
              ? "w-40 h-40 rounded-full border-4 bg-blue-800 z-10 text-white flex items-center justify-center"
              : "", // Apply class only to the root node
        });
      }

      if (!nodes.find((node) => node.id === protein2Id)) {
        nodes.push({
          id: protein2Id,
          data: { label: protein2Id },
          position: { x: Math.random() * 800, y: Math.random() * 800 },
          type: "customNode",
        });
      }

      edges.push({
        id: `e${protein1Id}-${protein2Id}`,
        source: protein1Id,
        target: protein2Id,
        type: "customEdge",
        data: { label: `Score: ${interaction.combined_score}` },
        label: `Score: ${interaction.combined_score}`,
      });
    }
  });

  return { nodes, edges };
};

export const arrangeNodesRadially = (
  rootNode: Node,
  children: { id: string; radius: number; angle: number; label: string }[]
) => {
  const angleStep = (2 * Math.PI) / children.length;

  return children.map((child, index) => {
    const angle = angleStep * index;
    const x = rootNode.position.x + child.radius * Math.cos(angle);
    const y = rootNode.position.y + child.radius * Math.sin(angle);

    return {
      id: child.id,
      position: { x, y },
      data: { label: child.label },
      type: "customNode",
    };
  });
};
