
# Blue Key Decryptor Pro

A secure desktop application for decrypting .drm files with password authentication.

## Features

- **File Upload**: Select and decrypt .drm files
- **Password Protection**: Secure password-based decryption
- **Multi-format Support**: Preview PDFs, images, and text files
- **Security Features**: Built-in copy protection and watermarking
- **Offline Operation**: Works completely offline once built

## Technology Stack

This project is built with:

- **Frontend**: React + TypeScript + Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: TanStack Query

## Development Setup

### Prerequisites

- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- FastAPI backend running on http://localhost:8000

### Getting Started

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```sh
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Backend Integration

This application expects a FastAPI backend running on `http://localhost:8000` with the following endpoint:

- `POST /decrypt` - Accepts .drm files and passwords for decryption

## Deployment Options

### Desktop Application (.exe)

1. **FastAPI Backend**: Package with PyInstaller
2. **React Frontend**: Package with Electron
3. **Distribution**: Single or separate executable files

### Web Deployment

The built application can be deployed to any static hosting service.

## Security Features

- Right-click blocking
- Copy/paste prevention  
- Screenshot hotkey blocking
- Content watermarking
- Read-only file previews

## File Format Support

- **PDF**: Full preview with embedded watermarks
- **Images**: JPG, PNG, GIF, BMP with overlay protection
- **Text**: Syntax-highlighted viewer with CSS watermarks

## License

This project is proprietary software for secure file decryption.
