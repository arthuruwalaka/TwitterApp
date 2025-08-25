# Twitter Bookmarks Search App 🐦

A full-stack web application that allows users to search through their Twitter bookmarks using Twitter's API v2. Built with Django, React, and modern web technologies.

## 🚀 Features

- **OAuth 2.0 Authentication** - Secure Twitter login with refresh token support
- **Bookmark Management** - Fetch and store user bookmarks locally
- **Advanced Search** - Search through bookmarks by text, username, or display name
- **Real-time Updates** - Automatically sync new bookmarks
- **Media Support** - Handle tweets with images and videos
- **Responsive UI** - Modern, mobile-friendly interface built with React

## 🛠️ Tech Stack

### Backend

- **Django 4.1** - Python web framework
- **Django REST Framework** - API development
- **Tweepy** - Twitter API client library
- **PostgreSQL** - Database (configurable)
- **OAuth 2.0** - Authentication flow

### Frontend

- **React 18** - Modern UI framework
- **Webpack 5** - Build tooling
- **SCSS** - Advanced styling
- **Bootstrap** - Responsive components
- **Axios** - HTTP client

### Architecture

- **RESTful API** - Clean API design
- **JWT-like Session Management** - Secure user sessions
- **Database Migrations** - Version-controlled schema changes
- **Environment Configuration** - Secure credential management

## 🔧 Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- Twitter Developer Account (for API keys)

### Backend Setup

```bash
cd app/backend/
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver 8000
```

### Frontend Setup

```bash
cd app/backend/client/
npm install
npm start
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
API_KEY=your_twitter_api_key
API_KEY_SECRET=your_twitter_api_secret
CLIENT_ID=your_twitter_client_id
CLIENT_SECRET=your_twitter_client_secret
CALLBACK_URL=your_callback_url
```

## 📱 Usage

1. **Login** - Authenticate with your Twitter account
2. **Sync Bookmarks** - Automatically fetch your bookmarks
3. **Search** - Use the search bar to find specific bookmarks
4. **Browse** - Navigate through your saved tweets

## 🏗️ Project Structure

```
TwitterApp/
├── app/
│   ├── backend/                 # Django backend
│   │   ├── twitter_api/         # Twitter API integration
│   │   ├── tweets/             # Tweet models and views
│   │   ├── users/              # User authentication
│   │   └── client/             # React frontend
│   │       ├── Components/     # React components
│   │       └── src/            # Source files
└── README.md
```

## 🔐 Authentication Flow

The app implements a complete OAuth 2.0 flow:

1. User initiates Twitter login
2. Redirect to Twitter authorization
3. Handle callback with authorization code
4. Exchange code for access/refresh tokens
5. Store tokens securely in database
6. Automatic token refresh when needed

## 💾 Database Design

- **TwitterUser** - Stores user profile and authentication data
- **Tweets** - Caches tweet content and metadata
- **Media** - Handles tweet attachments (images, videos)
- **TwitterAccessToken** - Manages OAuth tokens

## 🚨 Current Limitations

**Important Note**: This project was built when Twitter's API was more accessible. Due to recent changes:

- ❌ **Bookmarks API** - Removed by Twitter/X
- ❌ **Free API Access** - Now requires paid subscription ($100+/month)
- ❌ **Rate Limits** - Significantly more restrictive

## 🎯 Learning Outcomes

This project demonstrates:

- **Full-stack Development** - Complete web application architecture
- **API Integration** - Complex third-party API implementation
- **OAuth 2.0** - Secure authentication patterns
- **Database Design** - Relational database modeling
- **Real-time Updates** - Background data synchronization
- **Modern Frontend** - React with modern build tools

## 🔮 Future Possibilities

While the current Twitter API limitations prevent this app from working, the codebase could be adapted for:

- Different social media platforms
- RSS feed aggregators
- Content bookmarking services
- Learning OAuth 2.0 implementation patterns

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

_Built with ❤️ and ☕ during the golden age of Twitter's developer-friendly API_
