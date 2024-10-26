# Next.js Cart App

A mini food ordering web app built with Next.js, featuring product listing, a functional shopping cart, and an order placement system. The project is built as part of the Shopping Cart Challenge with an emphasis on providing a seamless user experience and responsive design.

This app integrates with a demo e-commerce API to list products, manage a shopping cart, and place orders.

## Table of Contents

- Features
- Bonus Goals
- API Reference
- Design
- Style Guide
- Getting Started
- How to Run the Project
- Resources
- Notes

## Features

- Product Listing: Displays food items with images, descriptions, and prices.
- Add/Remove from Cart: Allows users to add products to the cart or remove them.
- Order Total Calculation: Accurately calculates and displays the total cost of items in the cart.
- Cart Item Management: Users can increase or decrease the quantity of products in the cart.
- Order Confirmation: Confirms the order once the user completes their purchase.
- Interactive Elements: Includes hover and focus states for interactive UI elements.

## Bonus Goals

- Discount Codes:
- `HAPPYHOURS`: Apply an 18% discount to the order total.
- `BUYGETONE`: Apply a "Buy One Get One Free" discount, giving the lowest-priced item for free.
- Responsive Design: The app is responsive and adapts to different screen sizes, including mobile and desktop views.

## API Reference

This project uses a demo e-commerce API for product listing and order placement.

- API Documentation: API Documentation
- API Specification (OpenAPI 3.1): API Spec

## Design

The project follows the design guidelines provided in the Figma design file. The design was created with the following layout sizes:

- Mobile: 375px width
- Desktop: 1440px width

You can adjust for different screen sizes as necessary to maintain responsiveness and accessibility.

### Style Guide

The project follows a minimal style guide for fonts and sizes:

- Font Family: Red Hat Text
- Font Weights: 400, 600, 700

**Typography**

- Font size (product names): 16px

**Font**

- Family: [Red Hat Text](https://fonts.google.com/specimen/Red+Hat+Text)
- Weights: 400, 600, 700

## Getting Started

If you are encountering **CORS (Cross-Origin Resource Sharing)** issues when trying to make API requests, you can bypass this by using a CORS proxy. To request a demo server, visit:

- [CORS Anywhere Demo](https://cors-anywhere.herokuapp.com/corsdemo)

This will allow you to temporarily bypass CORS restrictions that imposed by the third-party API.

To set up the project locally, follow these steps:

1. Clone the repository:
   git clone https://github.com/your-username/nextjs-cart-app.git
   cd nextjs-cart-app

2. Install dependencies
   npm install

3. Set up environment variables: Create a .env.local file in the root directory and add any necessary environment variables. For example:
   NEXT_PUBLIC_API_URL=https://orderfoodonline.deno.dev/api

4. Run the development server:
   npm run dev

5. Visit http://localhost:3000 to view the app.

## How to Run the Project

After cloning the repository, install the dependencies using npm install Start the development server with npm run dev. The app will be accessible at http://localhost:3000 for local testing.

## Deployment

The project is deployed using Vercel. Visit `https://nextjs-cart-app-sw4o.vercel.app/` for production version.

**Resources**

- API Documentation: https://orderfoodonline.deno.dev/public/openapi.html
- API Specification: https://orderfoodonline.deno.dev/public/openapi.yaml
- Figma Design File: Design.fig
- Red Hat Text Font: Google Fonts https://fonts.google.com/specimen/Red+Hat+Text
