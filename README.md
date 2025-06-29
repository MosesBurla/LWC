# Life With Christ Community Platform

A comprehensive spiritual community platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🙏 **Core Community Features**
- **User Authentication & Profiles** - Secure registration with admin approval
- **Small Groups** - Join and manage faith-based community groups
- **Events & RSVP** - Community events with Google Meet integration
- **Prayer Requests** - Submit and pray for community prayer needs
- **Daily Devotionals** - Inspiring daily content with email subscriptions
- **Community Posts** - Share testimonies, announcements, and discussions
- **Real-time Notifications** - Stay connected with community activity

### 👥 **Group Management**
- Public, private, and invite-only groups
- Group leaders and co-leaders
- Group-specific posts and discussions
- Meeting schedules and locations

### 📅 **Event System**
- Event creation and management
- RSVP tracking with status options
- Online meeting integration (Google Meet)
- Event categories and filtering
- Calendar integration

### 🙏 **Prayer Request System**
- Anonymous and public prayer requests
- Prayer status tracking (needs prayer, ongoing, answered)
- Community prayer responses
- Prayer request updates and testimonies

### 📖 **Daily Devotionals**
- Daily Bible verses with reflections
- Author attribution and reading time
- Bookmark and sharing features
- Email subscription system
- Archive with search and filtering

### 🔔 **Notification System**
- Real-time notifications for community activity
- Email notifications for important updates
- Customizable notification preferences
- Notification history and management

### 🛡️ **Admin Dashboard**
- User approval and management
- Content moderation and reporting
- Community analytics and metrics
- Bulk actions and notifications
- System configuration

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **State Management**: Zustand
- **Routing**: React Router v6
- **UI Components**: Custom components with Lucide React icons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd life-with-christ-community
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_FRONTEND_URL=http://localhost:5173
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in `supabase/migrations/` in order
   - Deploy the Edge Functions in `supabase/functions/`

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Supabase Setup

1. **Database Schema**
   Run the migration files in your Supabase SQL editor:
   - `001_initial_schema.sql` - Creates all tables and policies
   - `002_sample_data.sql` - Adds sample data for development

2. **Edge Functions**
   Deploy the Edge Functions for email and external integrations:
   ```bash
   supabase functions deploy send-welcome-email
   supabase functions deploy create-google-meet-event
   supabase functions deploy subscribe-devotionals
   ```

3. **Storage Buckets**
   Create storage buckets for:
   - `avatars` - User profile pictures
   - `posts` - Post media attachments
   - `events` - Event images

4. **Environment Variables**
   Set up the following in your Supabase Edge Functions:
   - `SENDGRID_API_KEY` - For email notifications
   - `GOOGLE_CLIENT_ID` - For Google Calendar integration
   - `GOOGLE_CLIENT_SECRET` - For Google Calendar integration

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   └── ...                 # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configurations
├── pages/                  # Page components
├── store/                  # Zustand state management
└── types/                  # TypeScript type definitions

supabase/
├── functions/              # Edge Functions
└── migrations/             # Database migrations
```

## Key Features Implementation

### Authentication Flow
- Users register with personal information and faith journey
- Admin approval required before account activation
- Role-based access control (member, leader, admin)
- Protected routes with authentication checks

### Real-time Features
- Live notifications using Supabase subscriptions
- Real-time updates for posts, comments, and reactions
- Live RSVP counts for events
- Instant prayer request updates

### Content Management
- Rich text posts with media attachments
- Content moderation and reporting system
- Automatic content filtering
- Admin content management tools

### Email Integration
- Welcome emails for new users
- Daily devotional subscriptions
- Event reminders and updates
- Prayer request notifications

## Deployment

### Frontend Deployment
The app can be deployed to any static hosting service:

```bash
npm run build
```

### Supabase Configuration
- Set up production environment variables
- Configure email templates
- Set up proper CORS policies
- Configure storage policies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**"For where two or three gather in my name, there am I with them." - Matthew 18:20**

Built with ❤️ for the Kingdom of God