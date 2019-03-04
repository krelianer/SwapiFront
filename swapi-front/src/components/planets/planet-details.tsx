import React from 'react'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { DialogTitle, Divider, List, ListItem, Avatar, ListItemText, Icon, DialogContent, Dialog } from '@material-ui/core';
import { Planets } from '../../models/planet';
import { Container, Row, Col } from 'react-bootstrap';
import "font-awesome/css/font-awesome.css";

const styles = (theme: Theme) =>
    createStyles({
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        dialogTitle: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            margin: 0,
            padding: theme.spacing.unit * 2,
            backgroundColor: "#2196f3",
        },
        dialogContent: {
            marginTop: "1vh",
        },
    });

export interface PlanetDetailsProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: (() => void);
    planet: Planets;
}

export interface PlanetDetailsState {
    open: boolean;
}

class PlanetDetails extends React.Component<PlanetDetailsProps, PlanetDetailsState> {
    constructor(props: PlanetDetailsProps) {
        super(props);

        this.state = {
            open: false,
        }
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { classes } = this.props;

        return (
            <Dialog aria-labelledby="alert-dialog-title"
                open={this.props.open}
                onClose={this.handleClose}
                fullWidth={true}
                maxWidth={"md"}>
                <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{this.props.planet.name}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Container>
                        <Row>
                            <Col>
                                <img className={classes.img} alt="complex" src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2012/couldadeaths.jpg" />
                            </Col>
                            <Col>
                                <List>
                                    <ListItem>
                                        <Avatar>
                                            <Icon className={"fa fa-globe"} />
                                        </Avatar>
                                        <ListItemText primary="Rotation period" secondary={this.props.planet.rotation_period} />
                                    </ListItem>
                                    <Divider variant="middle" />
                                    <ListItem>
                                        <Avatar>
                                            <Icon className={"fa fa-sun"} />
                                        </Avatar>
                                        <ListItemText primary="Orbital period" secondary={this.props.planet.orbital_period} />
                                    </ListItem>
                                    <Divider variant="middle" />
                                    <ListItem>
                                        <Avatar>
                                        </Avatar>
                                        <ListItemText primary="Diameter" secondary={this.props.planet.diameter} />
                                    </ListItem>
                                    <Divider variant="middle" />
                                    <ListItem>
                                        <Avatar>
                                            <Icon className={"fa fa-cloud-sun-rain"} />
                                        </Avatar>
                                        <ListItemText primary="Climate" secondary={this.props.planet.climate} />
                                    </ListItem>
                                </List>
                            </Col>
                            <Col>
                                <List>
                                    <ListItem>
                                        <Avatar>
                                            <Icon className={"fa fa-mountain"} />
                                        </Avatar>
                                        <ListItemText primary="Terrain" secondary={this.props.planet.terrain} />
                                    </ListItem>
                                    <Divider variant="middle" />
                                    <ListItem>
                                        <Avatar>
                                        </Avatar>
                                        <ListItemText primary="Water surface" secondary={this.props.planet.surfaceWater} />
                                    </ListItem>
                                    <Divider variant="middle" />
                                    <ListItem>
                                        <Avatar>
                                        </Avatar>
                                        <ListItemText primary="Population" secondary={this.props.planet.population} />
                                    </ListItem>
                                    <Divider variant="middle" />

                                    <ListItem>
                                        <Avatar>
                                        </Avatar>
                                        <ListItemText primary="Gravity" secondary={this.props.planet.gravity} />
                                    </ListItem>
                                </List>
                            </Col>
                        </Row>
                    </Container>
                </DialogContent >
            </Dialog >
        )
    }
}

export default withStyles(styles)(PlanetDetails);
