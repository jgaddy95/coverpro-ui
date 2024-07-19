'use client'

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Step, 
  StepLabel, 
  Stepper, 
  Typography, 
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Snackbar,
  Alert
} from '@mui/material';
import ResumeUpload from '../components/ResumeUpload';
import ResumeReview from '../components/ResumeReview';
import JobDescriptionInput from '../components/JobDescriptionInput';
import CoverLetterDisplay from '../components/CoverLetterDisplay';
interface ResumeData {
  name: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  achievements: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#90caf9', // Lighter blue
    },
    background: {
      default: '#121212', // Very dark grey
      paper: '#1e1e1e', // Dark grey
    },
  },
});

const JobApplicationAssistant: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    location: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    achievements: ''
  });
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<any>(null);


  useEffect(() => {
    console.log("JobApplicationAssistant component mounted");
  }, []);

  const steps = ['Upload Resume', 'Review Resume Data', 'Enter Job Description', 'Generated Cover Letter'];

  const handleResumeDataUpdate = (data: ResumeData) => {
    console.log("Resume data updated:", data);
    setResumeData(data);
    setActiveStep(1);
  };


  const handleJobDescriptionSubmit = async (description: string) => {
    console.log("Submitting job description for cover letter generation:", description);
    setJobDescription(description);
    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: description, resumeData }),
      });
      const data = await response.json();
      console.log("Received response from cover letter generation:", data);
      if (response.ok) {
        setCoverLetterData(data.coverLetter);
        setActiveStep(3);
      } else {
        throw new Error(data.detail || 'Failed to generate cover letter');
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };


  console.log(`Current step: ${steps[activeStep]}`);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Cover Letter Assistant
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Paper elevation={3} sx={{ mt: 3, p: 3, bgcolor: 'background.paper' }}>
            {activeStep === 0 && <ResumeUpload onResumeProcessed={handleResumeDataUpdate} />}
            {activeStep === 1 && <ResumeReview resumeData={resumeData} onSubmit={() => setActiveStep(2)} />}
            {activeStep === 2 && <JobDescriptionInput onSubmit={handleJobDescriptionSubmit} />}
            {activeStep === 3 && <CoverLetterDisplay coverLetterData={coverLetterData} />}
          </Paper>
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default JobApplicationAssistant;