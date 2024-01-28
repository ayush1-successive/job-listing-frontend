import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationWrapper, Login } from "../components/Account";
import "./setupTests";
import TestUser from "./TestUser";

describe("Login Page Test", () => {
  let testUser;

  beforeAll(() => {
    testUser = new TestUser();
  });

  beforeEach(async () => {
    await testUser.insertFakeEntry();
  });

  afterEach(async () => {
    await testUser.deleteFakeEntry();
  });

  test("Form check", () => {
    render(
      <AuthenticationWrapper>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthenticationWrapper>
    );

    expect(
      screen.getByRole("form", { name: "login-form" })
    ).toBeInTheDocument();
  });

  test("form submission failed", async () => {
    render(
      <AuthenticationWrapper>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthenticationWrapper>
    );

    const emailElement = screen.getByLabelText("Email");
    const passwordElement = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(emailElement, { target: { value: "jn@example.com" } });
    fireEvent.change(passwordElement, { target: { value: "jnjn_pass" } });

    expect(emailElement).toHaveValue("jn@example.com");
    expect(passwordElement).toHaveValue("jnjn_pass");

    fireEvent.click(loginButton);
    expect(
      await screen.findByText("no user found for current email!")
    ).toBeInTheDocument();
  });

  test("form submission passed", async () => {
    render(
      <AuthenticationWrapper>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthenticationWrapper>
    );

    const emailElement = screen.getByLabelText("Email");
    const passwordElement = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(emailElement, { target: { value: testUser.email() } });
    fireEvent.change(passwordElement, {
      target: { value: testUser.password() },
    });

    expect(emailElement).toHaveValue(testUser.email());
    expect(passwordElement).toHaveValue(testUser.password());

    fireEvent.click(loginButton);
    expect(
      await screen.findByText(
        "Login successful. Redirecting to Dashboard page.."
      )
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
