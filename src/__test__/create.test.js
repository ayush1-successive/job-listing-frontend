import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React, { Suspense } from "react";
import { MenuKey } from "../modules/navbar";
import { Create as JobCreate } from "../modules/job/Create";
import "./setupTests";

describe("Create Page Test", () => {
  test("Open upload page and navigate to bulk-upload", async () => {
    await act(async () => {
      render(
        <Suspense fallback={<>Loading...</>}>
          <MenuKey>
            <JobCreate />
          </MenuKey>
        </Suspense>
      );
    });

    expect(screen.getByText("Post Job")).toBeInTheDocument();

    const uploadMenuItem = screen.getByText("Bulk Upload");
    expect(uploadMenuItem).toBeInTheDocument();

    fireEvent.click(uploadMenuItem);

    await waitFor(() =>
      expect(screen.getByText("Active Job Listings")).toBeInTheDocument()
    );
  });
});
