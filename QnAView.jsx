// src/components/QnaView.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const CompanyQnACard = ({ companyName, qnaData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: isExpanded ? '600px' : 300,
        flex: '0 0 auto',
        height: 'fit-content',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'relative',
        m: 1,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            {companyName}
          </Typography>
          <Tooltip title={isExpanded ? "Collapse" : "Expand"}>
            <IconButton 
              size="small" 
              onClick={() => setIsExpanded(!isExpanded)}
              sx={{ ml: 1 }}
            >
              <FullscreenIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ 
          overflowY: 'auto', 
          maxHeight: isExpanded ? '60vh' : '400px',
          pr: 1
        }}>
          {qnaData.map((qa, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                color="primary.dark"
                sx={{ fontWeight: 'bold' }}
              >
                Q{index + 1}: {qa.question}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {qa.answer}
              </Typography>
              {index < qnaData.length - 1 && (
                <Divider sx={{ mt: 2 }} />
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const QnaView = ({ companiesData, selectedProducts }) => {
  const theme = useTheme();
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 330; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Group QnA by company
  const getCompanyQnAs = () => {
    const companyQnAs = new Map();

    companiesData.forEach(company => {
      const companyQnA = [];
      company.products.forEach(product => {
        if (selectedProducts[product.id]) {
          product.qna.forEach(qa => {
            companyQnA.push({
              ...qa,
              productName: product.name
            });
          });
        }
      });
      if (companyQnA.length > 0) {
        companyQnAs.set(company.name, companyQnA);
      }
    });

    return Array.from(companyQnAs).map(([companyName, qna]) => ({
      companyName,
      qna
    }));
  };

  const companyQnAs = getCompanyQnAs();

  if (companyQnAs.length === 0) {
    return (
      <Paper 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          bgcolor: 'background.default' 
        }}
      >
        <Typography color="text.secondary">
          Please select products to view their Q&A content
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', p: 2 }}>
      {/* Scroll Buttons */}
      <IconButton
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'background.default' },
        }}
        onClick={() => scroll('left')}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Scrollable Container */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          px: 5, // Padding for scroll buttons
          scrollBehavior: 'smooth',
          '::-webkit-scrollbar': {
            height: 8,
            bgcolor: 'background.paper',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: 2,
          },
        }}
      >
        {companyQnAs.map((company, index) => (
          <CompanyQnACard
            key={index}
            companyName={company.companyName}
            qnaData={company.qna}
          />
        ))}
      </Box>

      <IconButton
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'background.paper',
          boxShadow: 2,
          '&:hover': { bgcolor: 'background.default' },
        }}
        onClick={() => scroll('right')}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default QnaView;
