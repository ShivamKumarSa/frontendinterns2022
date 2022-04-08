import { CircularProgress, Grid } from '@mui/material';
import { useGetPreDefinedConfigurationsQuery } from '../../api/openAPI';
import PredefinedCard from './PredefinedCard';

const PreDefinedConfigurations = () => {
  const { data } = useGetPreDefinedConfigurationsQuery();

  return !data ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={4}>
      {data.map((preDefinedConfiguration: any) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
          <PredefinedCard item={preDefinedConfiguration} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PreDefinedConfigurations;
