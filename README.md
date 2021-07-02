# Products Dashboard

## Getting Started

First, run the development server:

```bash
yarn dev
```

## Firebase Configurations

Add .env.local file to project root

```env
NEXT_PUBLIC_FIREBASE_API_KEY={API_KEY}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={PROJECT_ID}
NEXT_PUBLIC_FIREBASE_APP_ID={APP_ID}
```

## Seed users to Firebase

After running server, and config firebase, visit `http://localhost:3000/api/seedUsers` it will seed users to your firebase account and return them as json array, you can edit users credentials in `src/users.json` file.
