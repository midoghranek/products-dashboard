# Products Dashboard

## Getting Started

First, run the development server:

```bash
yarn dev
```

## Firebase Configurations

Add .env.local file to project root

```env
NEXT_PUBLIC_FIREBASE_API_KEY={apiKey}
NEXT_PUBLIC_FIREBASE_PROJECT_ID={projectId}
NEXT_PUBLIC_FIREBASE_APP_ID={appId}
NEXT_PUBLIC_MESSAGING_SENDER_ID={messagingSenderId}
```

## Seed users to Firebase

After running server, and config firebase, visit `http://localhost:3000/api/seedUsers` it will seed users to your firebase account and return them as json array, you can edit users credentials in `src/users.json` file.
