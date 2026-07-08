import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteHeader } from "@repo/ui/features/header/site-header";

const meta: Meta<typeof SiteHeader> = {
  title: "Blocks/Header/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logoSrc: { control: "text" },
    logoAlt: { control: "text" },
    searchPlaceholder: { control: "text" },
    phoneNumber: { control: "text" },
    bookAppointmentLabel: { control: "text" },
    bookAppointmentUrl: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SpecialitiesActive: Story = {
  args: {
    mainNavLinks: [
      { label: "Home", href: "/" },
      { label: "Specialities", href: "/bmc-specialities/", active: true },
      { label: "Our Experts", href: "/our-expert/" },
      { label: "Global Patients", href: "/global-patients/" },
    ],
  },
};
