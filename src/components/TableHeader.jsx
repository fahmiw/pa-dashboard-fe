import { Radius } from "lucide-react";
import React from "react";

function TableHeader({ children }) {
  const headerStyle = {
    backgroundColor: "#2F8AFD",
    textAlign: "left",
    padding: "0.75rem 1rem",
    fontWeight: 600,
    color: "#000000ff",
    borderBottom: "1px solid #e0e0e0",
  };
  return <thead style={headerStyle}>{children}</thead>;
}

export default TableHeader;
