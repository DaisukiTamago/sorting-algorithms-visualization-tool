interface ListElement {
  value: number;
}

interface CanvasElement {
  color?: string;
  x: number;
  y: number;
}

interface Bar extends ListElement, CanvasElement {
  width: number;
  height: number;
}

interface Change {
  type: "set" | "get";
  index: number;
  value: number;
}
