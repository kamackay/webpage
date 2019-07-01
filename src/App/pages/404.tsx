import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      height: "95vh", 
    },
    paragraph: {
        
    }
  })
);

export default function PaperSheet() {
  const classes = styles();

  return (
    <div className={classNames("container", "container-fluid")}>
      <Paper className={classes.root}>
        <Typography variant="h2" component="h2">
          Woah there.
        </Typography>
        <p className={classes.paragraph}>I don't know where you were trying to go, but I couldn't find it</p>
      </Paper>
    </div>
  );
}
