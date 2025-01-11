import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ_ITEMS = [
  {
    question: "Can I hold Bitcoin or other cryptocurrencies in an ISA?",
    answer: "No, you cannot directly hold Bitcoin or other cryptocurrencies in an ISA. However, you can invest in cryptocurrency-related investments through an ISA in these ways: 1) Exchange-Traded Funds (ETFs) that track crypto companies, 2) Shares in companies that hold cryptocurrency or blockchain technology, or 3) Investment trusts that have crypto exposure. For direct cryptocurrency investment, you'll need a separate crypto exchange account, but these investments won't have ISA tax benefits."
  },
  {
    question: "What is an Accumulation Fund?",
    answer: "An accumulation fund automatically reinvests any income (like dividends) back into the fund. This means your money is used to buy more shares, helping your investment grow over time. It's like a snowball getting bigger as it rolls downhill."
  },
  {
    question: "What is a Distribution Fund?",
    answer: "A distribution fund pays out any income (like dividends) directly to you. You can use this as regular income or reinvest it yourself. Think of it like a fruit tree - you can collect the fruit (income) while the tree (your investment) continues to grow."
  },
  {
    question: "How do ISAs protect my investments from tax year after year?",
    answer: "Money in an ISA is protected from tax forever, not just in the year you invest. Here's an example:\n\nYear 1: You invest £20,000 (your full ISA allowance)\nYear 2: Your investment grows to £22,000 (£2,000 gain) - No tax on this gain\nYear 3: It grows to £25,000 (another £3,000 gain) - Still no tax\nYear 4: You get £1,000 in dividends - No tax on these dividends\nYear 5: You sell some shares for a £5,000 profit - No tax on this profit\n\nEach new tax year, you get a fresh £20,000 ISA allowance to protect more investments from future tax. The money already in your ISA stays tax-free forever, even if it grows to £100,000 or more. It's like each year you can put more money under a permanent tax-free umbrella."
  },
  {
    question: "How are ISAs different for tax?",
    answer: "An ISA (Individual Savings Account) is completely tax-free. You pay NO tax on: 1) Any dividends received or reinvested, 2) Any profits when you sell, regardless of the amount. For example, if you invest £20,000 in an ISA and it grows to £30,000 with £1,500 yearly dividends, you keep all the growth and dividends tax-free. The annual ISA allowance is £20,000 (2023/24)."
  }
];

function FAQ() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'background.default',
      py: 4,
      px: 2
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4
          }}
        >
          Frequently Asked Questions
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {FAQ_ITEMS.map((item, index) => (
                <Accordion 
                  key={index} 
                  sx={{
                    backgroundColor: 'rgba(33, 150, 243, 0.04)',
                    borderRadius: '8px !important',
                    '&:before': { display: 'none' },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:first-of-type': { borderRadius: '8px !important' },
                    '&:last-of-type': { borderRadius: '8px !important' },
                    '&.Mui-expanded': {
                      margin: '0 !important',
                      borderRadius: '8px !important',
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                    sx={{
                      '&.Mui-expanded': {
                        minHeight: '48px',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 500,
                        color: 'primary.main'
                      }}
                    >
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 3, pb: 2 }}>
                    <Typography 
                      sx={{ 
                        whiteSpace: 'pre-line', 
                        color: 'text.secondary',
                        lineHeight: 1.7
                      }}
                    >
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default FAQ; 