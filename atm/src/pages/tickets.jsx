
import React from 'react'
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


class AlertWarning extends React.Component {
  render() {
    return (
      <Alert
        show={this.props.show}
        size="lg"
        variant='warning'
        dismissible
        onClose={this.props.onClose}
      >
        <Alert.Heading >
            You overbooked for {this.props.overBookDay}
        </Alert.Heading>
      </Alert>
    );
  }
}

class ErrorModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show} onHide={() => this.props.onHide({ msg: 'Cross Icon Clicked!' })}
        size="lg"
        aria-labelledby="errorModal"
        centered
        variant='danger'
      >
        <Modal.Header closeButton>
          <Modal.Title id="errorModal">
          {/* <Alert variant="danger" > */}
            You are not allowed to move a meeting!
          {/* </Alert> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

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

const calculateHours = (list) =>
{
   let res = 0;
   for (let i = 0; i<list.length; i++)
   {
      res = res + list[i]['content']['Estimated']
   }
   return res;
}

class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists1: null,
      elem: null,
      show: false,
      over : false,
      overBookDay : ''
    };
    this.onDragEnd = this.onDragEnd.bind(this);

  }
  url = process.env.REACT_APP_API_URL + "/getTickets/?emailAddress=danhurjui24@gmail.com";

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
    if (!result.destination) {
      return;
    }
    else if( this.state.elem[result.source.droppableId][result.source.index]['type'] === "Meeting")
    {
      this.setState({
        show: true
      });
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

    let hours = calculateHours(listCopy[result.destination.droppableId])
    let overbook = false;
    if (hours > 8 && (result.destination.droppableId != 'Backlog'))
    {
      overbook = true;
    }

    this.setState({
      elem: listCopy,
      over: overbook,
      overBookDay: result.destination.droppableId,
    });
  }
  handleClose = () => {
    this.setState({
      show: false,
      over:false
    });
  }

  render() {
    if (!this.state.elem)
      return null;

    return (
        <>
         <div class="sticky">
                    <AlertWarning
                    show={this.state.over}
                    overBookDay={this.state.overBookDay}
                    onClose={this.handleClose}
                    />
          </div>
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.lists1.map((listKey) => (
                  <DraggableElement
                    elements={this.state.elem[listKey]}
                    key={listKey}
                    prefix={listKey}
                  />
                ))}
            </DragDropContext>

                  <div>
                    <ErrorModal
                     show={this.state.show}
                     onClick={this.handleClose}
                     onHide={this.handleClose}
                     />
                  </div>


        </>
      )

  }
}



export default Tickets;