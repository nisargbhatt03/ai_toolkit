export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Writing" | "Productivity" | "Social" | "Education" | "Creative";
  iconName: string;
  gradient: string;
  badge?: string;
  placeholderText: string;
  inputLabel: string;
}
