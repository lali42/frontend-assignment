import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: "0 75px" }}>
      <h1>Page Not Found</h1>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}
