import { ref, computed } from "./main";

const example = () => {
  // fresh example
  // ----------------------------
  let freshTheme = ref<"dark" | "light">("light");
  freshTheme.subscribe(() => {
    localStorage.setItem("freshTheme", freshTheme.value);
  });
  const reversedFreshTheme = computed({ freshTheme }, () => {
    if (freshTheme.value == "dark") {
      return "light";
    } else {
      return "dark";
    }
  });
  freshTheme.value = "dark";
  let freshThemeInStorage = localStorage.getItem("freshTheme");
  console.log("freshThemeInStorage", freshThemeInStorage); // 'dark'
  console.log("reversedFreshTheme", reversedFreshTheme.value); // 'light'
  // ----------------------------
  // tired example
  // ----------------------------
  let tiredTheme: "dark" | "light" = "light";
  localStorage.setItem("tiredTheme", tiredTheme);
  tiredTheme = "dark";
  let tiredThemeInStorage = localStorage.getItem("tiredTheme");
  console.log("tiredThemeInStorage", tiredThemeInStorage); // 'light'
  // ----------------------------
  // different between examples just one hook on changing data for hold fresh data
};

export default example;
