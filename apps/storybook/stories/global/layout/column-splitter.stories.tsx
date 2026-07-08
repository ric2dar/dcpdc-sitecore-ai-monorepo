import type { Meta, StoryObj } from "@storybook/react-vite";

type ColumnVariant = {
  heading: string;
  description: string;
  columns: { className: string; label: string }[];
};

const VARIANTS: ColumnVariant[] = [
  {
    heading: "2 Equal Columns (col-6 / col-6)",
    description: "Two equal-width columns.",
    columns: [
      { className: "col-6", label: "Column 1 — 50%" },
      { className: "col-6", label: "Column 2 — 50%" },
    ],
  },
  {
    heading: "3 Equal Columns (col-4 / col-4 / col-4)",
    description: "Three equal-width columns.",
    columns: [
      { className: "col-4", label: "Column 1 — 33%" },
      { className: "col-4", label: "Column 2 — 33%" },
      { className: "col-4", label: "Column 3 — 33%" },
    ],
  },
  {
    heading: "4 Equal Columns (col-3 × 4)",
    description: "Four equal-width columns.",
    columns: [
      { className: "col-3", label: "Column 1 — 25%" },
      { className: "col-3", label: "Column 2 — 25%" },
      { className: "col-3", label: "Column 3 — 25%" },
      { className: "col-3", label: "Column 4 — 25%" },
    ],
  },
  {
    heading: "1/3 + 2/3 Split (col-4 / col-8)",
    description: "Narrow sidebar + wide content area.",
    columns: [
      { className: "col-4", label: "Sidebar — 33%" },
      { className: "col-8", label: "Main Content — 67%" },
    ],
  },
  {
    heading: "2/3 + 1/3 Split (col-8 / col-4)",
    description: "Wide content area + narrow sidebar.",
    columns: [
      { className: "col-8", label: "Main Content — 67%" },
      { className: "col-4", label: "Sidebar — 33%" },
    ],
  },
  {
    heading: "1/4 + 3/4 Split (col-3 / col-9)",
    description: "Narrow panel + broad content section.",
    columns: [
      { className: "col-3", label: "Panel — 25%" },
      { className: "col-9", label: "Content — 75%" },
    ],
  },
  {
    heading: "5 Columns (col-2 × 5)",
    description: "Five compact columns for dense grid layouts.",
    columns: [
      { className: "col-2", label: "Col 1" },
      { className: "col-2", label: "Col 2" },
      { className: "col-2", label: "Col 3" },
      { className: "col-2", label: "Col 4" },
      { className: "col-2", label: "Col 5" },
    ],
  },
];

function ColumnSplitterDemo() {
  return (
    <main className="w-full bg-background text-foreground p-4">
      {VARIANTS.map((variant) => (
        <section key={variant.heading} className="component container-default container mb-8">
          <div className="component-content">
            <h2 className="text-2xl font-semibold">{variant.heading}</h2>
            <p className="mt-2 text-base text-base-muted-foreground">{variant.description}</p>

            <div className="row column-splitter border border-dashed border-border rounded-md p-2 mt-4">
              {variant.columns.map((column, index) => (
                <div key={index} className={column.className}>
                  <div className="row">
                    <div
                      className="flex min-h-24 items-center justify-center rounded-md text-sm font-medium"
                      style={{
                        background: `hsl(${(index * 40 + 210) % 360} 70% 94%)`,
                        border: `1px solid hsl(${(index * 40 + 210) % 360} 45% 80%)`,
                      }}
                    >
                      {column.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

function SingleVariantDemo({ variant }: { variant: ColumnVariant }) {
  return (
    <main className="w-full bg-background text-foreground p-4">
      <section className="component container-default container mb-8">
        <div className="component-content">
          <h2 className="text-2xl font-semibold">{variant.heading}</h2>
          <p className="mt-2 text-base text-base-muted-foreground">{variant.description}</p>

          <div className="row column-splitter border border-dashed border-border rounded-md p-2 mt-4">
            {variant.columns.map((column, index) => (
              <div key={index} className={column.className}>
                <div className="row">
                  <div
                    className="flex min-h-24 items-center justify-center rounded-md text-sm font-medium"
                    style={{
                      background: `hsl(${(index * 40 + 210) % 360} 70% 94%)`,
                      border: `1px solid hsl(${(index * 40 + 210) % 360} 45% 80%)`,
                    }}
                  >
                    {column.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const meta: Meta<typeof ColumnSplitterDemo> = {
  title: "Global/Layout/Column Splitter",
  component: ColumnSplitterDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Demonstrates the SXA ColumnSplitter structure and common `col-*` width combinations.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  parameters: {
    layout: "fullscreen",
  },
};

export const TwoColumns: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[0]} />,
};

export const ThreeColumns: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[1]} />,
};

export const FourColumns: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[2]} />,
};

export const OneThirdTwoThirds: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[3]} />,
};

export const TwoThirdsOneThird: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[4]} />,
};
