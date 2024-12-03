# Micro-frontends

[Microfrontends fundamentals](https://www.youtube.com/watch?v=SqNjO5hMdrU&ab_channel=My50cents)

https://www.manning.com/liveproject/building-micro-frontends-with-a-team-based-vertical-architecture

Independence of development and releases, suitable for Domain-driven development(DDD). Primarily is organisational solution. You need to have justification for the microfrontends to reason all the complexity which comes with it, think of team size and potential product evolution growth.

Microfrontends helps to focus on Domain and sub-domain of applications from technical and organisational perspective. As a sub-domain, team has autonomy to choose the technologies for development, testing, deploying. Usage of different tech to build one system/platform, enables a lot of discussion between teams for the better system outcome.

## Vertical vs Horizontal Microfrontends

The terms vertical microfrontends and horizontal microfrontends describe different approaches to dividing a monolithic frontend into smaller, independently manageable parts. The choice between them depends on the application’s architecture and the team's organizational structure.

Vertical Microfrontends

A vertical microfrontend handles a complete end-to-end slice of functionality, encompassing both frontend and backend responsibilities. Each microfrontend is self-contained, managing:

    UI (Frontend)
    Business logic
    Data layer (Backend services or APIs)

Characteristics

    Complete Feature Ownership: A vertical microfrontend might manage all aspects of a single feature like user authentication, payments, or dashboards.
    Technology Independence: Teams can choose different tech stacks for different verticals (e.g., React for one and Angular for another).
    Independent Deployment: Each vertical microfrontend can be developed, deployed, and scaled independently.

Advantages

    Clear team boundaries, aligning with cross-functional teams (e.g., a team owns the “Users” feature across frontend and backend).
    Reduced cross-team dependencies, improving agility.
    Easier to scale specific features since each module is self-contained.

Example

In a carplates app:

    A User Management microfrontend (React):
        Handles registration, login, and profiles.
        Communicates with a dedicated user service in the backend.
    A Carplates microfrontend (Angular):
        Manages CRUD operations for carplates.
        Talks to a carplates API.

2. Horizontal Microfrontends

A horizontal microfrontend splits the application by frontend layer, focusing only on the UI. The backend or data layer remains centralized or shared across microfrontends. Horizontal microfrontends are often divided based on:

    UI layers (e.g., header, sidebar, or main content).
    Pages or navigation flows.

Characteristics

    Shared Backend: All microfrontends use the same backend services.
    Frontend-Focused: Teams specialize in building and maintaining UI components or pages.
    Shared Dependencies: Often relies on shared libraries or design systems for consistent styling and components.

Advantages

    Encourages reusability of components across multiple microfrontends.
    Easier implementation for UI-focused projects.
    Simplifies backend architecture by avoiding duplication of APIs.

Example

In a carplates app:

    A Header Microfrontend (React):
        Handles navigation and authentication status.
    A Main Content Microfrontend (Angular):
        Displays the carplates table and CRUD forms.
    A Sidebar Microfrontend (Vue.js):
        Provides quick links to cars or user settings.

3. Key Differences
   Aspect Vertical Microfrontends Horizontal Microfrontends
   Scope End-to-end, feature-based (frontend + backend). UI-focused, layer-based.
   Backend Independent for each vertical microfrontend. Shared backend across all microfrontends.
   Team Structure Cross-functional teams managing full features. Specialized frontend teams focused on UI layers.
   Tech Stack Can vary between verticals. Typically consistent within the same layer.
   Use Case Best for feature isolation, independent scaling, or tech migration. Best for shared UI projects or consistent UX requirements.
   Deployment Independent deployments for each feature. Deployment usually tied to frontend/UI updates.
4. When to Choose What?

   Choose Vertical Microfrontends:
   When features need to be fully independent (e.g., different products like "Users" vs. "Cars").
   If teams need freedom to choose different technologies.
   When the application must scale specific features independently.

   Choose Horizontal Microfrontends:
   When focusing on frontend layer separation (e.g., distinct teams for header, sidebar, and main content).
   To ensure consistency in UI/UX design across the app.
   If the backend is centralized and shared across all microfrontends.

5. Combining Both Approaches

In large systems, you can combine vertical and horizontal strategies:

    Use vertical microfrontends for feature-based divisions (e.g., “Users” and “Cars” modules).
    Apply horizontal microfrontends within a feature to divide UI components (e.g., header, sidebar, and main content for "Cars").
