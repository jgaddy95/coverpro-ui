import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Description } from '@mui/icons-material';

interface JobDescriptionInputProps {
  onSubmit: (jobDescription: string) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ onSubmit }) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jobDescription);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom color="primary">
        Enter Job Description
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        label="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        endIcon={<Description />}
        fullWidth
        color="primary"
        sx={{ mt: 2 }}
      >
        Generate Cover Letter
      </Button>
    </Box>
  );
};

export default JobDescriptionInput;