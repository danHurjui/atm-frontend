// import Card from 'react-bootstrap/Card'
// import CardGroup from 'react-bootstrap/CardGroup'
import React from 'react'
// import Container from 'react-bootstrap/Container'
import axios from "axios"
import Col from "react-bootstrap/Col"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from 'react-bootstrap/Table'
import Card from '@mui/material/Card';


import Container from "react-bootstrap/esm/Container";
import CardHeader from '@mui/material/CardHeader';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import styled from "styled-components";
import DraggableElement from "./DraggableElement";


const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists1: null,
      elem: null
    };
    this.onDragEnd = this.onDragEnd.bind(this);

  }
  url = "http://127.0.0.1:8000/getTickets/?emailAddress=danhurjui24@gmail.com";

  componentDidMount = () => {
    axios.get(this.url, { crossDomain: true })
      .then((response) => {
        if (response) {
          return response;
        }
        else {
          console.log("FAILURE");
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
      .then(data => {

        let keys = Object.keys(data['data']);
        let keyDay = [];
        let daysList = [];
        for (let i = 0; i < keys.length; i++)
        {
            keyDay = Object.keys(data['data'][keys[i]]);
            
            daysList.push(keyDay[0])
            
        }
        
        console.log(data['data'])
        let ele = {}
        for (let i = 0; i < keys.length; i++) {
          let temp = [];
          for (let j = 0; j < data['data'][keys[i]][daysList[i]].length; j++)
          {
            let temporary = {};
            temporary.id = `item-${data['data'][keys[i]][daysList[i]][j]['PriorityDefined']}`;
            temporary.content = data['data'][keys[i]][daysList[i]][j];
            temporary.prefix = daysList[i]
            temporary.type = data['data'][keys[i]][daysList[i]][j]['Type']
            temp.push(temporary);
          }
          ele[daysList[i]] = temp;
        }

     
       // let tempLists = generateLists();

       // console.log(tempLists);
        console.log(ele);

        this.setState({
          lists1: daysList,
          elem: ele

        });

      })
      .catch((error) => console.error("FETCH ERROR: ", error))
  };

  onDragEnd = (result) => {
    if (!result.destination || this.state.elem[result.source.droppableId][result.source.index]['type'] === "Meeting") {
      return;
    }
    const listCopy = { ...this.state.elem };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    this.setState({
      elem: listCopy
    });
  }

  render() {
    if (!this.state.elem)
      return null;
 
    return (
        <>
      
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.lists1.map((listKey) => (
                  <DraggableElement
                    elements={this.state.elem[listKey]}
                    key={listKey}
                    prefix={listKey}
                  />
                ))}
            </DragDropContext>
    

         
        </>
      )
    
  }
}



export default Tickets;