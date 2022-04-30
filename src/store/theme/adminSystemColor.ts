type Color = string;

interface AdminSystemColor {
  [key: string]: Color;
}

const adminSystemColor: AdminSystemColor = {
  sideBar: "rgba(180, 188, 183, 0.298)",
  sideBarButtonActive: "#646665",
  sideBarButtonHover: "#b4bcb7",
  tableTitleBackground: "#dadbdb",
  tableTitleText: "#555",
  tableBackground: "rgba(180, 188, 183, 0.298)",
  tableEvenRow: "#f8f8f8",
};

export default adminSystemColor;
