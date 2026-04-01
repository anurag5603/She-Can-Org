# AI-Powered Personalized Nutrition Planner

A comprehensive web application that generates personalized 7-day nutrition plans using AI technology. The app features a professional questionnaire flow, GPT-4 integration, and PDF/email delivery capabilities.

## Features

- **Smart Questionnaire**: Multi-step health and lifestyle assessment
- **AI-Powered Plans**: GPT-4 integration for personalized nutrition recommendations
- **Professional Output**: Dietitian-approved framework with medical disclaimers
- **PDF Export**: High-quality PDF generation with professional formatting
- **Email Delivery**: Send plans directly to users' email addresses
- **Responsive Design**: Mobile-first design with premium UI/UX
- **Supplement Recommendations**: Targeted supplement suggestions based on user profile
- **Lifestyle Guidance**: Comprehensive lifestyle recommendations

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory and add your OpenAI API key:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 2. OpenAI API Key

1. Visit [OpenAI API](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file

### 3. Email Integration (Optional)

For production email delivery, integrate with services like:
- SendGrid
- Mailgun
- AWS SES

Update the `emailService.ts` file with your chosen provider's API.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI Integration**: OpenAI GPT-4 API
- **PDF Generation**: jsPDF with html2canvas
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # React components
│   ├── DietPlanDisplay.tsx
│   ├── MultiSelect.tsx
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   ├── Questionnaire.tsx
│   └── SingleSelect.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── emailService.ts
│   ├── openai.ts
│   └── pdfGenerator.ts
├── App.tsx             # Main application component
├── index.css          # Global styles
└── main.tsx           # Application entry point
```

## Usage

1. Users complete a comprehensive health questionnaire
2. AI generates a personalized 7-day nutrition plan
3. Users can download the plan as PDF or receive via email
4. Plans include meals, supplements, and lifestyle recommendations

## Customization

### Modifying Questions
Edit the questionnaire steps in `src/components/Questionnaire.tsx`

### Adjusting AI Prompts
Modify the prompt engineering in `src/utils/openai.ts`

### Styling Changes
Update Tailwind classes throughout components or modify `src/index.css`

### PDF Formatting
Customize PDF layout in `src/utils/pdfGenerator.ts`

## Production Deployment

1. Set up environment variables in your hosting platform
2. Configure email service integration
3. Add proper error handling and monitoring
4. Implement user authentication if needed
5. Add analytics tracking

## Medical & Legal Considerations

- Include proper medical disclaimers
- Ensure dietitian review of framework
- Add privacy policy for health data
- Consider HIPAA compliance if storing data
- Include terms of service

## License

This project is for demonstration purposes. Ensure proper licensing for production use.