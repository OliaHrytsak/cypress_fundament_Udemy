/// <reference types="Cypress"/>

describe("tasks management", () => {
  it("should open and close new task modal", () => {
    cy.visit("http://localhost:5174/");
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");

    cy.get("#task-control button").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5174/");
    cy.get("#task-control button").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("New Task Summary");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("New Task");
    cy.get(".task p").contains("New Task Summary");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5174/");
    cy.get("#task-control button").click();
    cy.get(".modal").contains("Add Task").click();
    cy.contains(/please provide values/i);
    cy.contains("Please provide values");
  });

  it("should filter tasks", () => {
    cy.visit("http://localhost:5174/");
    cy.get("#task-control button").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("New Task Summary");
    cy.get("#category").select("🚨 Urgent");
    cy.get(".modal").contains("Add Task").click();

    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0);
    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1);
    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1);
  });

  it("should add multiple tasks", () => {
    cy.visit("http://localhost:5174/");
    cy.get("#task-control button").click();
    cy.get("#title").type("New Task");
    cy.get("#summary").type("New Task Summary");
    cy.get(".modal").contains("Add Task").click();

    cy.get("#task-control button").click();
    cy.get("#title").type("New 2 Task");
    cy.get("#summary").type("New 2 Task Summary");
    cy.get(".modal").contains("Add Task").click();

    cy.get(".task").should("have.length", 2);

    cy.get(".task").eq(0).contains("New Task");
    cy.get(".task").eq(1).contains("New 2 Task");
  });
});
