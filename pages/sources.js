import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Link,
  Divider,
  Container
} from '@mui/material';
import { requestSources } from "../actions/";
import { Layout } from "../components/";

export default function Sources() {
  const [sourcesState, setSourcesState] = useState([]);

  useEffect(() => {
    async function fetchSources() {
      try {
        const response = await requestSources();
        // Assuming the response is the array itself, not wrapped in an additional object
        setSourcesState(response);
      } catch (error) {
        console.error('Failed to fetch sources:', error);
      }
    }
    fetchSources();
  }, []);

  return (
      <Layout>
        <Container>
          <Typography variant="h3" gutterBottom>
            Sources
          </Typography>
          {sourcesState.map((item, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">
                    {item.sources.source_name_full}
                  </Typography>
                  <Typography variant="subtitle1">
                    Date Accessed: {item.sources.date_accessed}
                  </Typography>
                  {item.sources.is_comprehensive === "1" ? (
                      <Typography variant="subtitle1">
                        Comprehensive: Yes
                      </Typography>
                  ) : (
                      <Typography variant="subtitle1">
                        Comprehensive: No
                      </Typography>
                  )}
                  {item.sources.source_url && (
                      <Link href={item.sources.source_url} target="_blank" rel="noopener">
                        Learn More
                      </Link>
                  )}
                </Box>
              </Box>
          ))}
        </Container>
      </Layout>
  );
}
