import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { GetApp } from '@mui/icons-material';
import { jsPDF } from "jspdf";

interface CoverLetterDisplayProps {
  coverLetterData: any;
}

const CoverLetterDisplay: React.FC<CoverLetterDisplayProps> = ({ coverLetterData }) => {
  const coverLetterText = coverLetterData?.text || 'No cover letter generated yet.';

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add content to the PDF
    doc.setFontSize(12);
    doc.text(coverLetterText, 10, 10, { maxWidth: 190 });

    // Save the PDF
    doc.save("cover_letter.pdf");
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary">
        Your Cover Letter
      </Typography>
      {coverLetterText !== 'No cover letter generated yet.' ? (
        <>
          <Paper elevation={1} sx={{ p: 2, mb: 2, maxHeight: 300, overflow: 'auto', bgcolor: 'background.default' }}>
            <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
              {coverLetterText}
            </Typography>
          </Paper>
          <Button
            variant="contained"
            startIcon={<GetApp />}
            fullWidth
            color="primary"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
        </>
      ) : (
        <Typography variant="body1">
          {coverLetterText}
        </Typography>
      )}
    </Box>
  );
};

export default CoverLetterDisplay;