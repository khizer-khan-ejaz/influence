// Mirrors apps/core/choices.py in the Django backend. Keep the values in sync.
export const industryOptions = [
  { value: "ai", label: "AI & artificial intelligence" },
  { value: "saas", label: "SaaS & software" },
  { value: "technology", label: "B2B technology" },
  { value: "consumer_electronics", label: "Consumer electronics" },
  { value: "productivity", label: "Productivity & workspace" },
  { value: "diy_home", label: "DIY & home improvement" },
  { value: "lifestyle", label: "Lifestyle & consumer products" },
  { value: "other", label: "Other" },
] as const;

export const objectiveOptions = [
  { value: "awareness", label: "Brand awareness" },
  { value: "product_launch", label: "Product launch" },
  { value: "consideration", label: "Consideration & education" },
  { value: "acquisition", label: "Customer acquisition" },
  { value: "app_growth", label: "Sign-ups & app growth" },
  { value: "always_on", label: "Always-on creator programme" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

export const budgetOptions = [
  { value: "under_10k", label: "Under $10k" },
  { value: "10k_25k", label: "$10k – $25k" },
  { value: "25k_50k", label: "$25k – $50k" },
  { value: "50k_100k", label: "$50k – $100k" },
  { value: "100k_plus", label: "$100k+" },
  { value: "undecided", label: "Not decided yet" },
] as const;
