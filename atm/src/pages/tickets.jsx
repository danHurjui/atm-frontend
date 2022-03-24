import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import React from 'react'
import Container from 'react-bootstrap/Container'
import axios from "axios"
import Col from "react-bootstrap/Col"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from 'react-bootstrap/Table'
//import ReactSession from 'react-client-session'
//ReactSession.setStoreType("localStorage");

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  // margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver, itemsLength) => ({
  display: "flex",
  padding: grid,
 // width: itemsLength * 68.44 + 16
});


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


class DragTickets extends React.Component {
  constructor(props, items) {
    super(props);
    this.state = {
      items : props.items,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
    localStorage.setItem('Items', items);
    let items_temp = localStorage.getItem('Items');
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <Container>
      
      <div style={{overflow: "scroll"}}>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, this.state.items.length)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                    <Card >
                    <Card.Header>  {item.content.Id}</Card.Header>
                    <Card.Body>
                      <Card.Title>
                        {item.content.Title}
                      </Card.Title>
                      <Card.Text>
                        {item.content.Description}
                      </Card.Text>
                      <Card.Text>
                        Priority:{item.content.Priority}
                      </Card.Text>
                      <Card.Link href={item.content.Link}> Link to Jira</Card.Link>
                    </Card.Body>
                    </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      </Container>
    );
  }
}

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProcess: null,
      dragItems: null
    };

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
       
        console.log(data['data'])
        let temp = []
        for (let index = 0; index < data['data'].length; index++)
        {
          let temporary = {}
          temporary.id = `item-${index}`;
          temporary.content = data['data'][index];
          temp.push(temporary);
        }
        this.setState({
          dataProcess: data['data'],
          dragItems:temp
     
        });

      })
      .catch((error) => console.error("FETCH ERROR: ", error))
  };


  render() {
    if (!this.state.dataProcess)
      return null;
    else
    {
      let items_toRender;
      items_toRender = localStorage.getItem('Items');
      if (!items_toRender)
        items_toRender = this.state.dragItems;
    return (
      <>
      <Container>
        <Table>
        <thead> 
          <tr>
         <h4> List Of Tasks for Today:

         </h4>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
            <DragTickets items={this.state.dragItems}/>
            </td>
          
          </tr>
       
        </tbody>
        </Table>
       
      </Container>
        {/* <Container>
          <h1>This is my list of tickets for next week: </h1>
          <CardGroup>
              {this.state.dataProcess.map((dataP, k) => (
                  <Col key={k} xs={12} md={4} lg={3}>
                  <Card border="primary" className="mb-2">
                  <Card.Header>{dataP.Id}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {dataP.Title}
                    </Card.Title>
                    <Card.Text>
                      {dataP.Description}
                    </Card.Text>
                    <Card.Text>
                      Priority:{dataP.Priority}
                    </Card.Text>
                    <Card.Link href={dataP.Link}> Link to Jira</Card.Link>
                  </Card.Body>
                  </Card>
                  </Col>      
              ))}
          </CardGroup>}
              </Container> */}
      </>
    )
    }
  }
}



export default Tickets;