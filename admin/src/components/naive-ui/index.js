import path from "path-browserify";

export default function initC(app) {
  const files = import.meta.globEager("@/components/naive-ui/*.vue");
  Object.keys(files).forEach((key) => {
    const name = path.basename(key, ".vue");
    app.component(name, files[key].default || files[key]);
  });
}
