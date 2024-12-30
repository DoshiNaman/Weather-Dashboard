# Weather Dashboard

## Overview

The Weather Dashboard is a dynamic web application built using **Next.js** and **TypeScript**. It provides users with a responsive interface to view weather data, manage weather tags, and interact with the **OpenMetro Weather API**. The application utilizes the **Shadcn UI** library for a modern and user-friendly design.

## Features

- **Dynamic Weather Data**: Fetches and displays weather data using the OpenMetro Weather API.
- **Weather Tags**: Users can create, edit, and delete up to 4 weather tags to categorize their weather data.
- **Responsive Design**: The dashboard is fully responsive, ensuring a seamless experience across devices.
- **User Interface**: Built with Shadcn UI components for a polished and consistent look.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **Shadcn UI**: A component library that provides pre-designed UI components for faster development.
- **OpenMetro Weather API**: An API used to fetch real-time weather data.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd weather-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your OpenMetro API key:

   ```plaintext
   OPENMETRO_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Creating Weather Tags**: Users can create weather tags by filling out the form in the dashboard. Each tag can have a name and associated weather data.
- **Editing Weather Tags**: Click on a tag to edit its details. Users can update the name and other attributes.
- **Deleting Weather Tags**: Users can delete tags they no longer need, with a confirmation dialog to prevent accidental deletions.
- **Viewing Weather Data**: The dashboard displays current weather data fetched from the OpenMetro API, along with the associated tags.

## Responsive Design

The dashboard is designed to be fully responsive, adapting to various screen sizes. It utilizes CSS Flexbox and Grid layouts to ensure that components are displayed correctly on mobile, tablet, and desktop devices.

## Conclusion

The Weather Dashboard provides a comprehensive solution for users to manage and view weather data dynamically. With the integration of the OpenMetro API and the Shadcn UI library, it offers a modern and efficient user experience.

Feel free to contribute to the project or reach out for any questions or suggestions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Name:** Naman Doshi
- **Email:** [naman.01798@gmail.com](mailto:naman.01798@gmail.com)
- **GitHub:** [DoshiNaman](https://github.com/DoshiNaman)
- **LinkedIn:** [Naman Doshi](https://www.linkedin.com/in/naman-doshi-007/)

Thank you for visiting!
