# Shared Memories App

Shared Memories App allows users to create personalized galleries for their events and enables guests to upload images and videos using a QR code. The app also includes a feature for establishments, such as venues, to create accounts on behalf of event hosts (e.g., a couple getting married), providing them with a QR code that can be shared with guests to contribute media to the event gallery.

## Table of Contents

- [Shared Memories App](#shared-memories-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Establishment Accounts:](#establishment-accounts)
  - [Project Structure](#project-structure)
  - [License](#license)

## Features

- **Create Event Galleries**: Users can create galleries for their events.
- **QR Code Integration**: Generate QR codes that allow event guests to upload photos and videos directly to the gallery.
- **Guest Uploads**: Guests simply scan the QR code to upload images and videos to the gallery without needing to create an account.
- **Account Types**:
  - Individual Accounts: Event organizers can create galleries for personal events like weddings, birthdays, etc.
  - Establishment Accounts: Venues or service providers can create accounts on behalf of event hosts and provide them with QR codes for their events.
- **Responsive Design**: Built with TailwindCSS to ensure seamless performance across devices.

## Tech Stack

- **Next.js**: For the frontend and backend routing.
- **Shadcn**: For accessible and beautiful UI components.
- **TypeScript**: Ensures type safety and development efficiency.
- **TailwindCSS**: For rapid and responsive design development.
- **Bun**: Fast JavaScript runtime that handles server-side aspects of the application.

## Installation

To get started with the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/event-gallery-app.git
   cd event-gallery-app
   ```

2. Install the dependencies:

   ```
   bun install
   ```

3. Create a `.env` file in the root directory and configure necessary environment variables (e.g., database connection string, API keys for QR code generation).

4. Run the development server:

   ```
   bun dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Usage

1. **Create a Shared Memory**:

   - Sign up and create a new event.
   - Generate a QR code for the event.

2. **Share the QR Code**:

   - Share the generated QR code with guests or attendees.

3. **Guests Upload Media**:

   - Guests can scan the QR code and upload photos or videos directly to the event's gallery without needing to sign up.

4. **View and Manage Galleries**:
   - As an organizer, view uploaded content and manage the gallery.

### Establishment Accounts:

- Establishments (e.g., wedding venues) can create accounts for their clients.
- A unique QR code is generated for each event, and the couple can share it with guests for media uploads.

## Project Structure

## License

This project is licensed under the MIT License. See the LICENSE file for details.

This README provides a clear overview of your project and instructions on how to get started, and can be customized as you continue developing features.
