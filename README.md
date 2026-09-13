# SITRA Admin Portal

Backoffice administration and user management portal for the SITRA platform.

## Getting Started

### 1. Prerequisites
- Node.js 20+
- npm

### 2. Environment Configuration
Create or verify your `.env` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_MAX_FILE_RECORDS=200
NEXT_PUBLIC_ENV_TAG=Local
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
The application runs on port `3002`:

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```
