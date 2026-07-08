import type { Meta, StoryObj } from "@storybook/react-vite";

type ContainerStyleVariant = {
  heading: string;
  description: string;
  containerClassName?: string;
};

const VARIANTS: ContainerStyleVariant[] = [
  {
    heading: "Default Container",
    description:
      "No style applied. This is the baseline container with no additional CSS classes.",
  },
  {
    heading: "Centered Container (container)",
    description:
      "Applies centered max-width layout with auto side margins.",
    containerClassName: "container",
  },
  {
    heading: "Bordered Container (sxa-bordered)",
    description: "Applies border and inner padding.",
    containerClassName: "sxa-bordered",
  },
  {
    heading: "Indent Top (indent-top)",
    description: "Adds vertical spacing above the container.",
    containerClassName: "indent-top",
  },
  {
    heading: "Indent Bottom (indent-bottom)",
    description: "Adds vertical spacing below the container.",
    containerClassName: "indent-bottom",
  },
  {
    heading: "Indent Side (indent)",
    description: "Adds horizontal side padding inside the container.",
    containerClassName: "indent",
  },
  {
    heading: "Gray Background (container-gray-background)",
    description: "Applies muted gray background and vertical padding.",
    containerClassName: "container-gray-background",
  },
  {
    heading: "Dark Background (container-dark-background)",
    description: "Applies dark brand background with white foreground text.",
    containerClassName: "container-dark-background",
  },
  {
    heading: "Color Background (container-color-background)",
    description: "Applies primary brand blue background with white foreground text.",
    containerClassName: "container-color-background",
  },
  {
    heading: "Clean Background (container-clean-background)",
    description: "Applies clean white background override and vertical padding.",
    containerClassName: "container-clean-background",
  },
];

function ContainerStylesDemo() {
  return (
    <main className="w-full bg-background text-foreground">
      {VARIANTS.map((variant) => {
        const className = variant.containerClassName
          ? `component container-default ${variant.containerClassName}`
          : "component container-default";

        return (
          <section key={variant.heading} className={className}>
            <div className="component-content">
              <div className="row">
                <div className="col-12">
                  <h2 className="text-2xl font-semibold">{variant.heading}</h2>
                  <p className="mt-2 text-base text-base-muted-foreground">
                    {variant.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

interface SingleVariantDemoProps {
  variant: ContainerStyleVariant;
}

function SingleVariantDemo({ variant }: SingleVariantDemoProps) {
  const className = variant.containerClassName
    ? `component container-default ${variant.containerClassName}`
    : "component container-default";

  return (
    <main className="w-full bg-background text-foreground">
      <section className={className}>
        <div className="component-content">
          <div className="row">
            <div className="col-12">
              <h2 className="text-2xl font-semibold">{variant.heading}</h2>
              <p className="mt-2 text-base text-base-muted-foreground">
                {variant.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const meta: Meta<typeof ContainerStylesDemo> = {
  title: "Global/Layout/Container Styles",
  component: ContainerStylesDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Demonstrates SXA container style classes used by the Sitecore Container rendering (`Styles` parameter).",
      },
      canvas: {
        sourceState: "shown",
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

// Individual container style stories
export const Default: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[0]} />,
  parameters: { layout: "padded" },
};

export const Centered: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[1]} />,
  parameters: { layout: "padded" },
};

export const Bordered: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[2]} />,
  parameters: { layout: "padded" },
};

export const IndentTop: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[3]} />,
  parameters: { layout: "padded" },
};

export const IndentBottom: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[4]} />,
  parameters: { layout: "padded" },
};

export const IndentSide: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[5]} />,
  parameters: { layout: "padded" },
};

export const GrayBackground: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[6]} />,
  parameters: { layout: "padded" },
};

export const DarkBackground: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[7]} />,
  parameters: { layout: "padded" },
};

export const ColorBackground: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[8]} />,
  parameters: { layout: "padded" },
};

export const CleanBackground: Story = {
  render: () => <SingleVariantDemo variant={VARIANTS[9]} />,
  parameters: { layout: "padded" },
};
