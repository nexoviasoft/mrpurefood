import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4d8c1e",
    borderRadius: 3,
    fontFamily: "var(--font-baiJamjuree), var(--font-hindSiliguri)",
  },
  components: {
    Collapse: {
      contentBg: "#fff",
      headerBg: "#fff",
    },
    Checkbox: {
      colorBorder: "gray",
    },
    Rate: {
      starSize: 13,
      starColor: "#404040",
    },
  },
};

export { theme };
