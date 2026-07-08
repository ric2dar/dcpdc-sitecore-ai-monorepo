import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteFooter } from "@repo/ui/features/footer/site-footer";

const meta: Meta<typeof SiteFooter> = {
  title: "Blocks/Footer/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logoSrc: { control: "text" },
    logoAlt: { control: "text" },
    tagline: { control: "text" },
    address: { control: "text" },
    phone: { control: "text" },
    email: { control: "text" },
    appDescription: { control: "text" },
    copyright: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLinks: Story = {
  args: {
    quickLinks: [
      { label: "About Us", href: "/about-us/" },
      { label: "Find a Doctor", href: "/our-expert/" },
      { label: "Specialities", href: "/bmc-specialities/" },
    ],
    quickLinksSecondary: [
      { label: "Book Appointment", href: "/book-an-appointment/" },
      { label: "Feedback", href: "/feedback/" },
    ],
  },
};
