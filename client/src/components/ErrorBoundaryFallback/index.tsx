import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import useTheme from '@mui/material/styles/useTheme';
import type { FallbackProps } from 'react-error-boundary';

export default function ErrorBoundaryFallback ({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: '100vh' }}
    >
      <Card
        variant='outlined'
        sx={{ maxWidth: 750, minWidth: 500 }}
        role='alert'
      >
        <CardHeader title='Something went wrong' />
        <CardContent>
          <pre style={{ color: theme.palette.error.main }}>{error.message}</pre>
        </CardContent>
        <CardActions
          sx={{ flex: 'flex', justifyContent: 'center', paddingBottom: 2 }}
        >
          <Button
            variant='outlined'
            startIcon={<RefreshIcon />}
            onClick={resetErrorBoundary}
          >
            Refresh Page
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
