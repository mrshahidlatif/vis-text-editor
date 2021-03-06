import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Doc from "components/Doc";

import { createDoc } from "ducks/docs";

const useStyles = makeStyles((theme) => ({
    button: {
        width: "100%",
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    paper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.text.secondary,
        height: theme.spacing(16),
        width: "100%",
    },
}));

function Docs() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const docs = useSelector((state) => Object.values(state.docs));

    function handleClick() {
        const action = createDoc();
        dispatch(action);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={2}>
                <Button className={classes.button} onClick={handleClick}>
                    <Paper className={classes.paper} variant="outlined">
                        <AddIcon />
                    </Paper>
                </Button>
            </Grid>
            {docs.map((doc) => (
                <Grid key={doc.id} item xs={2}>
                    <Doc doc={doc} docId={doc.id} />
                </Grid>
            ))}
        </Grid>
    );
}

export default Docs;
