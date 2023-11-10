import { Grid } from "../Components/Grid";

export const GridExample = () => {
  return (
    <div className="w-[800px]">
      <Grid>
        <Grid cols={[3, 2]}>
          <div></div>
          <div></div>
        </Grid>
        <Grid cols={[1, 7]}>
          <div></div>
          <div></div>
        </Grid>
        <Grid cols={5}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Grid>
        <Grid cols={3}>
          <div></div>
          <div></div>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
};
