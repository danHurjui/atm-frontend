import { Draggable } from "react-beautiful-dnd";

import React, { useMemo } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Container } from '@mui/material';
import styled from "styled-components";

const grid = 1;


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 ${grid}px 1 1`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "lightblue",

    // styles we need to apply on draggables
    ...draggableStyle
});

const ListItem = ({ item, index }) => {
    if (item.type === "Jira") {
        return (
            <Container>
                <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={<Avatar sx={{ bgcolor: red[500] }}>J</Avatar>}
                                    titleTypographyProps={{
                                        fontSize: 15,
                                    }}
                                    subheaderTypographyProps={{
                                        fontSize: 10,
                                    }}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={item.content.Id}
                                    subheader={item.content.TaskType}
                                />
                                <CardContent>
                                    <Typography paragraph>

                                        {item.content.Description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href={item.content.Link}> Jira</Button>
                                </CardActions>
                            </Card>

                        </div>
                    )}
                </Draggable>
            </Container>
        );
    }
    else {
        return (
            <Container>
                <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={<Avatar sx={{ bgcolor: red[500] }}>M</Avatar>}
                                    titleTypographyProps={{
                                        fontSize: 15,
                                    }}
                                    subheaderTypographyProps={{
                                        fontSize: 10,
                                    }}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={item.content.Type}
                                    subheader={item.content.StartDate}
                                />
                                <CardContent>
                                    <Typography paragraph>
                                        {item.content.Description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" href={item.content.Link}> Calendar</Button>
                                </CardActions>
                            </Card>

                        </div>
                    )}
                </Draggable>
            </Container>
        );
    }
};

export default ListItem;
