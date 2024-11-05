# Lost and Found

Welcome to **Lost and Found** – a robust, user-friendly platform designed to help users report, find, and claim lost items efficiently. This system prioritizes user experience, secure authentication, and seamless data handling to ensure lost items can be tracked and recovered quickly.

## Project Overview

**Lost and Found** is a full-stack application built to streamline the process of reporting, searching for, and claiming lost items. Users can list items they’ve found, search for lost items, and make claims if they recognize something as their own. Our goal is to create an organized, reliable platform that connects items with their rightful owners while maintaining high standards of security and efficiency.

## Features

- **User Authentication**: Secure JWT-based user authentication.
- **Create Found Items**: Report found items with details like location, category, and distinguishing features.
- **Claim Items**: Users can claim items by providing details to verify ownership.
- **Profile Management**: Users can update their profiles, adding personal information and a bio.
- **Pagination and Filtering**: Easily search and filter through a list of items based on different criteria.
- **Admin Dashboard**: Future implementation of admin functionalities to oversee user activity and manage claims.

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod
- **Deployment**: (e.g., Docker, Heroku, etc. - add specific details if applicable)

## API Endpoints

Below is a summary of key API endpoints:

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login

### Profile Management

- `GET /api/my-profile`: Retrieve user profile
- `PUT /api/my-profile`: Update user profile

### Found Items

- `POST /api/found-items`: Report a found item
- `GET /api/found-items`: List found items with filtering and pagination

### Claims

- `POST /api/claims`: Create a claim for a found item
- `PUT /api/claims/:claimId`: Update claim status

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** (v14+)
- **PostgreSQL** (configured for local or remote access)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/NurMuhammadCSE/lost-and-found-server
   cd lost-and-found-server
   ```
