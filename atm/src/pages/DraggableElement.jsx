import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container"

const grid = 1;

const getListStyle = (isDraggingOver, isEmpty) => ({
  background: isDraggingOver ? "lightblue" : "white",
  display: "flex",
  padding: grid

});


const DraggableElement = ({ prefix, elements }) => (

      <div>
      <h3> {prefix}</h3>
      <div style={{ overflow: "scroll" }}>
      <Droppable droppableId={`${prefix}`} direction="horizontal">
        {(provided, snapshot) => (
          <div 
          {...provided.droppableProps} 
          ref={provided.innerRef}
          style = {getListStyle(snapshot.isDraggingOver)}
          >
            {elements.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </div>
      </div>
  
);

export default DraggableElement;
