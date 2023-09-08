import path from "path";
// import { createApp } from "vue";

export default function initC(v) {
  const files = import.meta.globEager("@/components/naive-ui/*.vue");
  console.log(files);
  console.log(files.keys());
  // files.keys.forEach((key) => {
  //   const name = path.basename(key, ".vue");
  //   Vue.component(name, files(key).default || files(key));
  //   v(name, files(key).default || files(key));
  // });
}
// files.keys()
