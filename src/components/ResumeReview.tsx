import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { ResumeData } from '../types';

interface ResumeReviewProps {
  resumeData: ResumeData;
  onSubmit: () => void;
}

const ResumeReview: React.FC<ResumeReviewProps> = ({ resumeData, onSubmit }) => {
  const renderInput = (label: string, name: keyof ResumeData, type: string = 'text') => (
    <TextField
      key={name}
      fullWidth
      label={label}
      name={name}
      value={resumeData[name]}
      onChange={(e) => {
        // If you need to update the resumeData, you'll need to lift this state up
        // or use a state management solution like Redux
      }}
      multiline={['summary', 'experience', 'education', 'skills', 'achievements'].includes(name)}
      rows={['summary', 'experience', 'education', 'skills', 'achievements'].includes(name) ? 4 : 1}
      margin="normal"
      type={type}
    />
  );

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <Typography variant="h5" gutterBottom color="primary">
        Review and Edit Resume Data
      </Typography>
      {renderInput('Name', 'name')}
      {renderInput('Location', 'location')}
      {renderInput('Email', 'email', 'email')}
      {renderInput('Phone', 'phone', 'tel')}
      {renderInput('Professional Summary', 'summary')}
      {renderInput('Work Experience', 'experience')}
      {renderInput('Education', 'education')}
      {renderInput('Skills', 'skills')}
      {renderInput('Achievements', 'achievements')}
      <Button
        type="submit"
        variant="contained"
        endIcon={<ArrowForward />}
        fullWidth
        color="primary"
        sx={{ mt: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default ResumeReview;