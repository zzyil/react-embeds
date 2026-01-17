import { render, screen } from "@testing-library/react";
import { EmbedCard } from "../../src/components/EmbedCard";

describe("EmbedCard", () => {
  it("renders core content and CTA link", () => {
    render(
      <EmbedCard
        provider="YouTube"
        title="Test title"
        body="This is a test body"
        href="https://example.com"
        ctaLabel="Open"
      />
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("This is a test body")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Open" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
