import type { Meta, StoryObj } from "@storybook/react-vite";

type RowVariant = {
  heading: string;
  description: string;
  rows: { className?: string; label: string }[];
};

const VARIANTS: RowVariant[] = [
  {
    heading: "2 Rows",
    description: "Basic two-row splitter structure.",
    rows: [{ label: "Row 1" }, { label: "Row 2" }],
  },
  {
    heading: "3 Rows",
    description: "Three stacked rows.",
    rows: [{ label: "Row 1" }, { label: "Row 2" }, { label: "Row 3" }],
  },
  {
    heading: "4 Rows",
    description: "Four stacked rows.",
    rows: [{ label: "Row 1" }, { label: "Row 2" }, { label: "Row 3" }, { label: "Row 4" }],
  },
  {
    heading: "Gray Background Rows",
    description: "Rows with muted background styles.",
    rows: [
      { className: "container-gray-background", label: "Gray Row 1" },
      { className: "container-gray-background", label: "Gray Row 2" },
    ],
  },
  {
    heading: "Dark Background Rows",
    description: "Rows with dark background styles.",
    rows: [
      { className: "container-dark-background", label: "Dark Row 1" },
      { className: "container-dark-background", label: "Dark Row 2" },
    ],
  },
];

function RowSplitterDemo() {
  return (
    <main className="w-full bg-background text-foreground p-4">
      {VARIANTS.map((variant) => (
        <section key={variant.heading} className="component container-default container mb-8">
          <div className="component-content">
            <h2 className="text-2xl font-semibold">{variant.heading}</h2>
            <p className="mt-2 text-base text-base-muted-foreground">{variant.description}</p>

            <div className="component row-splitter border border-dashed border-border rounded-md mt-4">
              {variant.rows.map((row, index) => (
                <div key={index} className={`container-fluid ${row.className ?? ""}`.trim()}>
                  <div>
                    <div className="row">
                      <div
                        className="col-12 flex min-h-20 items-center justify-center rounded-md text-sm font-medium"
                        style={{
                          background: `hsl(${(index * 45 + 120) % 360} 65% 94%)`,
                          border: `1px solid hsl(${(index * 45 + 120) % 360} 40% 80%)`,
                        }}
                      >
                        {row.label}
                      </div>
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

function SingleVariantDemo({ variant }: { variant: RowVariant }) {
  return (
    <main className="w-full bg-background text-foreground p-4">
      <section className="component container-default container mb-8">
        <div className="component-content">
          <h2 className="text-2xl font-semibold">{variant.heading}</h2>
          <p className="mt-2 text-base text-base-muted-foreground">{variant.description}</p>

          <div className="component row-splitter border border-dashed border-border rounded-md mt-4">
            {variant.rows.map((row, index) => (
              <div key={index} className={`container-fluid ${row.className ?? ""}`.trim()}>
                <div>
                  <div className="row">
                    <div
                      className="col-12 flex min-h-20 items-center justify-center rounded-md text-sm font-medium"
                      style={{
                        background: `hsl(${(index * 45 + 120) % 360} 65% 94%)`,
                        border: `1px solid hsl(${(index * 45 + 120) % 360} 40% 80%)`,
                      }}
                    >
                      {row.label}
                    </div>
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

const meta: Meta<typeof RowSplitterDemo> = {
  title: "Global/Layout/Row Splitter",
  component: RowSplitterDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Demonstrates the SXA RowSplitter structure and per-row style class usage.",
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

export const TwoRows: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[0]} />,
};

export const ThreeRows: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[1]} />,
};

export const FourRows: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[2]} />,
};

export const WithGrayBackground: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[3]} />,
};

export const WithDarkBackground: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[4]} />,
};
