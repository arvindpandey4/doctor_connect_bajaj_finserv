# Doctor Connect

A web application for finding and booking doctor appointments. This application allows users to search for doctors, filter by specialties and consultation type, and sort by fees or experience.

## Live Demo

Visit the live application: [Doctor Connect](https://doctor-connect-bajaj-finserv-final.vercel.app/)

## Features

- Search for doctors by name with autocomplete suggestions
- Filter doctors by specialty (multi-select)
- Filter doctors by consultation type (single-select: Video Consult or In-clinic)
- Sort doctors by fees (ascending) or experience (descending)
- URL persistence for all filters and search queries
- Responsive design for desktop and mobile

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **API**: External API for doctor data

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd doctorlist
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
doctorlist/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Main page component
│   │   ├── layout.tsx  # Layout component
│   │   └── globals.css # Global styles
│   ├── components/     # Reusable components
│   │   ├── DoctorCard.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SearchBar.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
│       └── useUrlParams.ts
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Project dependencies
```

## API Reference

The application uses data from the following API endpoint:
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```

This API returns a list of doctors with the following structure:
```typescript
interface Doctor {
  id: number;
  name: string;
  specialties: string[];
  experience: number;
  fee: number;
  rating: number;
  location: string;
  consultationMode: string[];
  imageUrl?: string;
}
```

## Data Test IDs

The application uses the following data-testid attributes for testing:

- `autocomplete-input`: Doctor name search input
- `suggestion-item`: Autocomplete suggestion items
- `filter-video-consult`: Video consultation filter radio
- `filter-in-clinic`: In-clinic consultation filter radio
- `filter-specialty-*`: Specialty checkboxes (e.g., `filter-specialty-Cardiologist`)
- `sort-fees`: Sort by fees radio
- `sort-experience`: Sort by experience radio
- `doctor-card`: Doctor card container
- `doctor-name`: Doctor name
- `doctor-specialty`: Doctor specialties
- `doctor-experience`: Doctor experience
- `doctor-fee`: Doctor fee
- `filter-header-speciality`: Specialty filter section header
- `filter-header-moc`: Mode of consultation filter section header
- `filter-header-sort`: Sort section header

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
