import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { CloudUpload, ArrowForward } from '@mui/icons-material';

interface ResumeUploadProps {
  onResumeProcessed: (resumeData: any) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onResumeProcessed }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleProcessResume = async () => {
    if (!resumeFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onResumeProcessed(data.resumeData);
      } else {
        throw new Error('Failed to process resume');
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      // Handle error (you might want to pass this to a parent component)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        Upload Your Resume
      </Typography>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
        fullWidth
        color="primary"
        sx={{ mb: 2 }}
      >
        Upload PDF
        <input
          type="file"
          hidden
          onChange={handleResumeUpload}
          accept=".pdf"
        />
      </Button>
      {resumeFile && (
        <>
          <Typography variant="body2" sx={{ mb: 2 }}>
            File uploaded: {resumeFile.name}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleProcessResume}
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : <ArrowForward />}
          >
            {isUploading ? 'Processing...' : 'Next'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default ResumeUpload;