# F1Flow

A modern, student-focused platform connecting aspiring professionals with mentors and career opportunities. F1Flow enables meaningful relationships, peer learning, and streamlined university recruitment through an intuitive interface and innovative features.

## ✨ Features

- **Profile Management**: Create and customize your professional profile with tags and portfolio highlights
- **Discovery & Search**: Find mentors and peers through intelligent search and filtering capabilities
- **Peer-to-Peer Connections**: Connect with students in your network with secure messaging (coming soon)
- **Journey Timeline**: Interactive multi-phase timeline to track your professional development
- **Theme Customization**: Choose from multiple theme options (Light, Dim, Dark, Teal) for a personalized experience
- **Responsive Design**: Fully responsive UI built with modern web standards and WCAG accessibility compliance
- **B2B Recruitment Integration**: University recruitment portals for seamless talent discovery (coming soon)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1.  Clone the repository:

```bash
git clone https://github.com/yourusername/f1flow.git
cd f1flow
```

2.  Install dependencies:

```bash
npm install
# or
yarn install
```

3.  Set up environment variables:

Create a `.env.local` file in the root directory and add any required API keys or configuration endpoints:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

4.  Run the development server:

```bash
npm run dev
# or
yarn dev
```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

-----

## 🎨 UI Guidelines & Code Standards

### Theme Engine

Themes are managed contextually. Avoid hardcoding raw hex values in individual components; instead, utilize the global CSS variables defined in the styling system:

*   `bg-primary`: Adapts to Light, Dim, Dark, or Teal.
*   `text-main`: Ensures proper contrast alignment based on WCAG standards across all theme updates.

### Component Logic

*   **Contextual Buttons:** The `Connect` action on profile cards should conditionally render based on the authentication state. If the `currentUser` matches the `profileUser`, replace the action [...]
*   **Independent Sidebar Scrolling:** The discovery sidebar operates on an independent `overflow-y: auto;` track to maintain a fixed central focus on the main profile viewpoint.

-----

## 🗺️ Roadmap

-   [ ] Connect profile tags directly to live search execution.
-   [ ] Complete integration of the interactive multi-phase Journey Timeline block.
-   [ ] Implement secure peer-to-peer messaging for connecting students with trusted mentors.
-   [ ] Deploy B2B university recruitment portals.

-----

## 📄 License

This project is proprietary and confidential. Unauthorized copying of these files via any medium is strictly prohibited.
Copyright (c) 2026 F1Flow.
