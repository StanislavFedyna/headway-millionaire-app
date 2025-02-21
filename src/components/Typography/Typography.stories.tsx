import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import '../../app/globals.css';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'body'],
      description: 'Typography style variant',
    },
    as: {
      control: 'text',
      description: 'Override the HTML element',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Main Heading (H1)',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Secondary Heading (H2)',
  },
};

export const BodyText: Story = {
  args: {
    variant: 'body',
    children:
      'This is a regular paragraph text that can span multiple lines. It demonstrates how body text looks in your application.',
  },
};
