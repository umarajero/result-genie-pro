import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

// NOTE: This is a standalone React component (TypeScript) that implements a mini-Canva-like
// template builder using react-konva. Drop it into your app (e.g. /components/TemplateBuilder.tsx)
// and wire up routes as needed.

// Basic element types
type ElementType = "text" | "image" | "table";

type BaseElement = {
  id: string;
  x: number;
  y: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  type: ElementType;
  zIndex?: number;
};

type TextElement = BaseElement & {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  fontStyle?: "normal" | "bold" | "italic";
  width?: number;
};

type ImageElement = BaseElement & {
  type: "image";
  src: string; // dataURL or URL
  width: number;
  height: number;
};

type TableElement = BaseElement & {
  type: "table";
  columns: string[];
  rows: string[][]; // array of rows
  cellPadding?: number;
  headerFill?: string;
  rowFill?: string;
  textColor?: string;
};

type Element = TextElement | ImageElement | TableElement;

const defaultStageWidth = 900;
const defaultStageHeight = 600;

function uid(prefix = "el") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// Small helper KonvaImage wrapper that loads from src
const URLImage: React.FC<{ element: ImageElement; isSelected: boolean; onClick?: () => void; onTransform?: (newAttrs: Partial<ImageElement>) => void }> = ({ element, isSelected, onClick, onTransform }) => {
  const [image] = useImage(element.src);
  const shapeRef = useRef<any>(null);

  useEffect(() => {
    if (shapeRef.current) {
      // sync transforms back if needed
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const width = node.width() * scaleX;
      const height = node.height() * scaleY;
      // call onTransform only when component unmounts? Keeping simple: call onTransform on mount
      onTransform?.({ width, height, scaleX, scaleY });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KonvaImage
      ref={shapeRef}
      image={image}
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation || 0}
      draggable
      onClick={onClick}
      onTap={onClick}
      onDragEnd={(e) => {
        onTransform?.({ x: e.target.x(), y: e.target.y() });
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const width = Math.max(5, node.width() * scaleX);
        const height = Math.max(5, node.height() * scaleY);
        node.scaleX(1);
        node.scaleY(1);
        onTransform?.({ x: node.x(), y: node.y(), width, height });
      }}
    />
  );
};

const TemplateBuilder: React.FC = () => {
  const stageRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const [elements, setElements] = useState<Element[]>(() => {
    // try load from localStorage
    try {
      const raw = localStorage.getItem("builder_elements");
      if (raw) return JSON.parse(raw) as Element[];
    } catch (e) {
      // ignore
    }
    // default starter elements
    return [
      {
        id: uid("text"),
        type: "text",
        x: 50,
        y: 40,
        text: "STATEMENT OF RESULT",
        fontSize: 28,
        fontFamily: "Arial",
        fill: "#1e3a8a",
        width: 800,
      } as TextElement,
      {
        id: uid("text2"),
        type: "text",
        x: 50,
        y: 90,
        text: "Academic Performance Report",
        fontSize: 16,
        fontFamily: "Arial",
        fill: "#374151",
        width: 800,
      } as TextElement,
    ];
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({ width: defaultStageWidth, height: defaultStageHeight });

  useEffect(() => {
    // save to localStorage on change
    localStorage.setItem("builder_elements", JSON.stringify(elements));
  }, [elements]);

  const addText = () => {
    const newEl: TextElement = {
      id: uid("text"),
      type: "text",
      x: 60,
      y: 200,
      text: "New text",
      fontSize: 18,
      fontFamily: "Arial",
      fill: "#111827",
      width: 400,
    };
    setElements((s) => [...s, newEl]);
    setSelectedId(newEl.id);
  };

  const addImageFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const imgEl: ImageElement = {
        id: uid("img"),
        type: "image",
        x: 80,
        y: 120,
        src,
        width: 160,
        height: 80,
      };
      setElements((s) => [...s, imgEl]);
      setSelectedId(imgEl.id);
    };
    reader.readAsDataURL(file);
  };

  const addTable = () => {
    const tbl: TableElement = {
      id: uid("tbl"),
      type: "table",
      x: 50,
      y: 300,
      columns: ["Subject", "Score", "Grade"],
      rows: [
        ["Mathematics", "85%", "A"],
        ["English", "88%", "A"],
        ["Science", "82%", "B"],
      ],
      cellPadding: 8,
      headerFill: "#f3f4f6",
      rowFill: "#ffffff",
      textColor: "#111827",
    };
    setElements((s) => [...s, tbl]);
    setSelectedId(tbl.id);
  };

  const updateElement = (id: string, patch: Partial<Element>) => {
    setElements((list) => list.map((el) => (el.id === id ? { ...el, ...patch } : el)));
  };

  const removeElement = (id: string) => {
    setElements((list) => list.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const bringForward = (id: string) => {
    setElements((list) => {
      const idx = list.findIndex((l) => l.id === id);
      if (idx === -1 || idx === list.length - 1) return list;
      const next = [...list];
      const [item] = next.splice(idx, 1);
      next.splice(idx + 1, 0, item);
      return next;
    });
  };

  const sendBackward = (id: string) => {
    setElements((list) => {
      const idx = list.findIndex((l) => l.id === id);
      if (idx <= 0) return list;
      const next = [...list];
      const [item] = next.splice(idx, 1);
      next.splice(idx - 1, 0, item);
      return next;
    });
  };

  const exportToPNG = () => {
    const uri = stageRef.current?.toDataURL({ pixelRatio: 2 });
    if (!uri) return;
    const link = document.createElement("a");
    link.download = "statement.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const exportToPDF = async () => {
    // uses jspdf. Ensure you have `jspdf` installed in your project
    // npm i jspdf
    const uri = stageRef.current?.toDataURL({ pixelRatio: 2 });
    if (!uri) return;
    // dynamic import so we don't bloat bundle
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [stageSize.width * 2, stageSize.height * 2] });
    pdf.addImage(uri, "PNG", 0, 0, stageSize.width * 2, stageSize.height * 2);
    pdf.save("statement.pdf");
  };

  const saveTemplateJSON = () => {
    const data = {
      stage: stageSize,
      elements,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadTemplateJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed?.elements) {
          setElements(parsed.elements);
          if (parsed.stage) setStageSize(parsed.stage);
        }
      } catch (e) {
        alert("Invalid template file");
      }
    };
    reader.readAsText(file);
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedId(null);
  };

  // keyboard delete handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        removeElement(selectedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  return (
    <div className="flex gap-4">
      {/* Sidebar */}
      <aside className="w-72 bg-white p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-3">Elements</h3>
        <div className="flex flex-col gap-2">
          <button onClick={addText} className="btn">Add Text</button>
          <label className="btn cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) addImageFromFile(f);
                e.currentTarget.value = "";
              }}
            />
          </label>
          <button onClick={addTable} className="btn">Add Table</button>
          <button onClick={() => {
            // bring last added element to selected
            const last = elements[elements.length - 1];
            if (last) setSelectedId(last.id);
          }} className="btn">Select Last</button>
        </div>

        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Actions</h3>
        <div className="flex flex-col gap-2">
          <button onClick={exportToPNG} className="btn">Export PNG</button>
          <button onClick={exportToPDF} className="btn">Export PDF</button>
          <button onClick={saveTemplateJSON} className="btn">Download JSON</button>
          <label className="btn cursor-pointer">Load JSON
            <input type="file" accept="application/json" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) loadTemplateJSON(f);
              e.currentTarget.value = "";
            }} />
          </label>
          <button onClick={clearCanvas} className="btn">Clear</button>
        </div>

        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Layers</h3>
        <div className="space-y-1 max-h-40 overflow-auto">
          {elements.map((el, idx) => (
            <div key={el.id} className={`p-2 rounded flex items-center justify-between ${selectedId === el.id ? "bg-blue-50" : ""}`}>
              <div className="text-sm truncate">
                {el.type.toUpperCase()} • {el.id}
              </div>
              <div className="flex gap-1">
                <button onClick={() => bringForward(el.id)} title="Bring forward" className="text-xs">▲</button>
                <button onClick={() => sendBackward(el.id)} title="Send backward" className="text-xs">▼</button>
                <button onClick={() => setSelectedId(el.id)} title="Select" className="text-xs">●</button>
                <button onClick={() => removeElement(el.id)} title="Delete" className="text-xs">✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Inspector for selected element */}
        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Inspector</h3>
        {selectedId ? (
          (() => {
            const el = elements.find((e) => e.id === selectedId)!;
            if (el.type === "text") {
              const te = el as TextElement;
              return (
                <div className="space-y-2 text-sm">
                  <label className="block">Text</label>
                  <input className="w-full input" value={te.text} onChange={(e) => updateElement(te.id, { text: e.target.value })} />
                  <label className="block">Font Size</label>
                  <input type="number" className="w-full input" value={te.fontSize} onChange={(e) => updateElement(te.id, { fontSize: Number(e.target.value) })} />
                  <label className="block">Color</label>
                  <input type="color" className="w-full" value={te.fill} onChange={(e) => updateElement(te.id, { fill: e.target.value })} />
                  <label className="block">Font Family</label>
                  <input className="w-full input" value={te.fontFamily} onChange={(e) => updateElement(te.id, { fontFamily: e.target.value })} />
                </div>
              );
            }
            if (el.type === "image") {
              const ie = el as ImageElement;
              return (
                <div className="space-y-2 text-sm">
                  <label className="block">Source</label>
                  <div className="break-all text-xs">{ie.src?.slice?.(0, 60)}</div>
                  <label className="block">Width</label>
                  <input type="number" className="w-full input" value={ie.width} onChange={(e) => updateElement(ie.id, { width: Number(e.target.value) })} />
                  <label className="block">Height</label>
                  <input type="number" className="w-full input" value={ie.height} onChange={(e) => updateElement(ie.id, { height: Number(e.target.value) })} />
                </div>
              );
            }
            // table inspector
            if (el.type === "table") {
              const te = el as TableElement;
              return (
                <div className="space-y-2 text-sm">
                  <label className="block">Columns</label>
                  <input className="w-full input" value={te.columns.join(", ")} onChange={(e) => updateElement(te.id, { columns: e.target.value.split(",").map(s => s.trim()) })} />
                  <label className="block">Rows (comma-separated cells, new line = new row)</label>
                  <textarea className="w-full input" rows={4} value={te.rows.map(r => r.join(",")).join("\n")} onChange={(e) => updateElement(te.id, { rows: e.target.value.split('\n').map(line => line.split(',').map(c => c.trim())) })} />
                </div>
              );
            }
            return null;
          })()
        ) : (
          <div className="text-sm text-muted-foreground">Select an element to edit</div>
        )}
      </aside>

      {/* Canvas */}
      <div className="flex-1 bg-gray-50 p-4 rounded">
        <div className="mb-2 flex items-center gap-3">
          <div className="text-sm">Canvas size:</div>
          <input type="number" value={stageSize.width} onChange={(e) => setStageSize(s => ({ ...s, width: Number(e.target.value) }))} className="w-24 input" />
          <input type="number" value={stageSize.height} onChange={(e) => setStageSize(s => ({ ...s, height: Number(e.target.value) }))} className="w-24 input" />
        </div>

        <div className="bg-white p-3 rounded shadow" style={{ width: stageSize.width + 16 }}>
          <Stage width={stageSize.width} height={stageSize.height} ref={stageRef} style={{ background: "white" }}>
            <Layer ref={layerRef}>
              {/* background rectangle (document) */}
              <Rect x={0} y={0} width={stageSize.width} height={stageSize.height} fill="#fff" stroke="#e5e7eb" strokeWidth={1} />

              {elements.map((el) => {
                if (el.type === "text") {
                  const te = el as TextElement;
                  return (
                    <Group key={te.id} x={te.x} y={te.y} draggable onClick={() => setSelectedId(te.id)} onDragEnd={(e) => updateElement(te.id, { x: e.target.x(), y: e.target.y() })}>
                      <Text text={te.text} fontSize={te.fontSize} fontFamily={te.fontFamily} fill={te.fill} width={te.width} />
                    </Group>
                  );
                }
                if (el.type === "image") {
                  const ie = el as ImageElement;
                  return (
                    <Group key={ie.id} x={ie.x} y={ie.y}>
                      <URLImage element={ie} isSelected={selectedId === ie.id} onClick={() => setSelectedId(ie.id)} onTransform={(patch) => updateElement(ie.id, patch)} />
                    </Group>
                  );
                }
                if (el.type === "table") {
                  const te = el as TableElement;
                  // simple table render: header row + rows
                  const cellWidth = 140;
                  const cellHeight = 28;
                  return (
                    <Group key={te.id} x={te.x} y={te.y} draggable onClick={() => setSelectedId(te.id)} onDragEnd={(e) => updateElement(te.id, { x: e.target.x(), y: e.target.y() })}>
                      {/* header */}
                      {te.columns.map((col, ci) => (
                        <Group key={`h_${ci}`} x={ci * cellWidth} y={0}>
                          <Rect width={cellWidth} height={cellHeight} fill={te.headerFill} stroke="#e5e7eb" />
                          <Text text={col} fontSize={12} fontFamily="Arial" x={6} y={6} fill={te.textColor} />
                        </Group>
                      ))}
                      {/* rows */}
                      {te.rows.map((row, ri) => (
                        <Group key={`r_${ri}`} x={0} y={(ri + 1) * cellHeight}>
                          {row.map((cell, ci) => (
                            <Group key={`r_${ri}_${ci}`} x={ci * cellWidth} y={0}>
                              <Rect width={cellWidth} height={cellHeight} fill={ri % 2 === 0 ? te.rowFill : "#f9fafb"} stroke="#e5e7eb" />
                              <Text text={cell} fontSize={12} fontFamily="Arial" x={6} y={6} fill={te.textColor} />
                            </Group>
                          ))}
                        </Group>
                      ))}
                    </Group>
                  );
                }
                return null;
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;
